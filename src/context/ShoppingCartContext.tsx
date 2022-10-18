import { createContext, ReactNode, useContext, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { formatCurrency } from '../utilities/formatCurrency'
import ShoppingCart from '../components/ShoppingCart'

type ShoppingCartProviderProps = {
	children: ReactNode
}

type ShoppingCartContext = {
	openCart: () => void
	closeCart: () => void
	getItemQuantity: (id: number) => number
	increaseCartQuantity: (id: number) => void
	decreaseCartQuantity: (id: number) => void
	removeFromCart: (id: number) => void
	cartQuantity: number
	cartItems: CartItem[]
}

type CartItem = {
	id: number
	quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
	return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', [])

	const cartQuantity = cartItems.reduce(
		(quantity, items) => items.quantity + quantity,
		0
	)

	const openCart = () => setIsOpen(true)
	const closeCart = () => setIsOpen(false)

	function getItemQuantity(id: number) {
		return cartItems.find((item) => item.id == id)?.quantity || 0
	}

	function increaseCartQuantity(id: number) {
		setCartItems((currentItems) => {
			if (currentItems.find((item) => item.id === id)?.quantity == null) {
				return [...currentItems, { id, quantity: 1 }]
			} else {
				return currentItems.map((item) =>
					item.id === id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			}
		})
	}

	function decreaseCartQuantity(id: number) {
		setCartItems((currentItems) => {
			if (currentItems.find((item) => item.id === id)?.quantity === 1) {
				return currentItems.filter((item) => item.id !== id)
			} else {
				return currentItems.map((item) =>
					item.id === id
						? { ...item, quantity: item.quantity - 1 }
						: item
				)
			}
		})
	}

	function removeFromCart(id: number) {
		setCartItems((currentItems) => {
			return currentItems.filter((item) => item.id !== id)
		})
	}

	return (
		<ShoppingCartContext.Provider
			value={{
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
				cartItems,
				cartQuantity,
				openCart,
				closeCart,
			}}
		>
			{children}
			<ShoppingCart isOpen={isOpen} />
		</ShoppingCartContext.Provider>
	)
}

import React from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { useIsSmall } from '../hooks/useMediaQuery'
import { motion, AnimatePresence } from 'framer-motion'
import { formatCurrency } from '../utilities/formatCurrency'
import products from '../data/products.json'
import CartItem from '../components/CartItem'

type ShoppingCartProps = {
	isOpen: boolean
}

export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
	const { closeCart, cartItems } = useShoppingCart()
	const isSmall = useIsSmall()

	return (
		<>
			<AnimatePresence>
				{isOpen ? (
					<motion.div
						initial={{ width: 0 }}
						animate={isSmall ? { width: 380 } : { width: 600 }}
						transition={{ ease: 'linear' }}
						exit={{ width: 0 }}
						className="cart-container"
					>
						<div className="cart-heading-container">
							<h2 className="cart-heading">Cart</h2>
							<button className="close-cart" onClick={closeCart}>
								&times;
							</button>
						</div>
						<div className="cart-items-list">
							{cartItems.map((item) => (
								<CartItem key={item.id} {...item} />
							))}
						</div>
						<div className="cart-total">
							Total:{' '}
							{formatCurrency(
								cartItems.reduce((total, cartItem) => {
									const item = products.find(
										(i) => i.id === cartItem.id
									)
									return (
										total +
										(item?.price || 0) * cartItem.quantity
									)
								}, 0)
							)}
							{cartItems.length > 0 && (
								<button className="btn">Checkout</button>
							)}
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</>
	)
}

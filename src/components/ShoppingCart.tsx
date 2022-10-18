import React from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'
import CartItem from '../components/CartItem'
import { formatCurrency } from '../utilities/formatCurrency'
import products from '../data/products.json'

type ShoppingCartProps = {
	isOpen: boolean
}

export default function ShoppingCart({ isOpen }: ShoppingCartProps) {
	const { closeCart, cartItems } = useShoppingCart()
	return (
		<>
			{isOpen ? (
				<div className="cart-container">
					<div className="cart-heading">
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
					</div>
				</div>
			) : null}
		</>
	)
}

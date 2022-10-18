import React from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'
import products from '../data/products.json'
import { formatCurrency } from '../utilities/formatCurrency'

type CartItemProps = {
	id: number
	quantity: number
}

export default function CartItem({ id, quantity }: CartItemProps) {
	const { removeFromCart } = useShoppingCart()
	const item = products.find((item) => item.id === id)

	if (item == null) return null
	return (
		<div className="cart-item-container">
			<div className="item-info">
				<img src={item.image_path.images[0]} alt="" />
				<div className="item-info">
					<p className="album">
						{item.album}{' '}
						{quantity > 1 && (
							<span className="cart-item-quantity">
								x{quantity}
							</span>
						)}
					</p>
					<p className="artist">{item.artist}</p>
					<p className="price">{formatCurrency(item.price)}</p>
				</div>
			</div>
			<div className="item-total">
				<p className="price">{formatCurrency(item.price * quantity)}</p>
				<button
					className="btn remove-btn"
					onClick={() => removeFromCart(item.id)}
				>
					Remove
				</button>
			</div>
		</div>
	)
}

import React from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utilities/formatCurrency'

type ProductProp = {
	product: {
		id: number
		artist: string
		album: string
		year: string
		genre: string
		description: string
		price: number
		quantity: number
		image_path: {
			images: string[]
		}
	}
}

export default function Product({ product }: ProductProp) {
	const {
		getItemQuantity,
		increaseCartQuantity,
		decreaseCartQuantity,
		removeFromCart,
	} = useShoppingCart()

	const quantity = getItemQuantity(product.id)

	return (
		<div className="product">
			<img src={product.image_path.images[0]} alt="" className="image" />
			<p className="album">
				{product.album} <span className="lighter">{product.year}</span>
			</p>
			<p className="artist">{product.artist}</p>
			<p className="genre">{product.genre}</p>
			<p className="price">{formatCurrency(product.price)}</p>

			{quantity === 0 ? (
				<div className="cart-control">
					<button
						className="btn btn-primary"
						onClick={() => increaseCartQuantity(product.id)}
					>
						Add to Cart
					</button>
				</div>
			) : (
				<>
					<div className="cart-control">
						<button
							className="quantity-btn"
							onClick={() => decreaseCartQuantity(product.id)}
						>
							-
						</button>
						<div className="quantity-text">
							<span className="quantity">{quantity}</span> in cart
						</div>
						<button
							className="quantity-btn"
							onClick={() => increaseCartQuantity(product.id)}
						>
							+
						</button>
						<button
							className="btn btn-remove"
							onClick={() => removeFromCart(product.id)}
						>
							Remove
						</button>
					</div>
				</>
			)}
		</div>
	)
}

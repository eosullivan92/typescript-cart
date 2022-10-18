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
	
    const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()

    const quantity = getItemQuantity(product.id)

	return (
		<div className="product">
			<img
				src={product.image_path.images[0]}
				alt=""
				className="image"
				style={{ height: 'auto', width: '150px' }}
			/>
			<p className="artist">{product.artist}</p>
			<p className="album">{product.album}</p>
			<p className="year">{product.year}</p>
			<p className="genre">{product.genre}</p>
			<p className="price">{formatCurrency(product.price)}</p>

			{quantity === 0 ? (
				<div className="add-to-cart-control">
					<button className="cart-add" onClick={() => increaseCartQuantity(product.id)}>Add to Cart</button>
				</div>
			) : (
                <>
				<div className="quantity-control">
					<button className="quantity-remove" onClick={() => decreaseCartQuantity(product.id)}>-</button>
					<div className="quantity-text"><span className='quantity'>{product.quantity}</span> available</div>
					<button className="quantity-add" onClick={() => increaseCartQuantity(product.id)}>+</button>
				</div>
                <div className="remove-contol">
                    <button className="cart-remove" onClick={() => removeFromCart(product.id)}>Remove</button>
                </div>
                </>
			)}
		</div>
	)
}

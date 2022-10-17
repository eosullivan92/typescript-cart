import React from 'react'

type ProductProp = {
    product: {
        id: number,
        artist: string,
        album: string,
        year: string,
        genre: string,
        description: string,
        price: number,
        quantity: number,
        image_path: {
            images: string[]
        }
    }
}

export default function Product({product}:ProductProp) {
  return (
    <div className="product">
    <img src={product.image_path.images[0]} alt="" className="image" style={{height: 'auto', width: '150px'}}/>
    <p className="artist">{product.artist}</p>
    <p className="album">{product.album}</p>
    <p className="year">{product.year}</p>
    <p className="genre">{product.genre}</p>
    <p className="price">${product.price}</p>

    <button className="cart-remove" >
      -
    </button>
    <div className="quantity">{product.quantity} available</div>
    <button className="cart-add" >
      +
    </button>
  </div>
  )
}

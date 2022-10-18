import React from 'react'
import products from '../data/products.json'
//
import Product from '../components/Product'

export default function Store() {
	return (
		<div className="store-container">
			<h1>Store</h1>
			<div className="products-grid">
				{products.map((item) => (
					<Product product={item} key={item.id} />
				))}
			</div>
		</div>
	)
}

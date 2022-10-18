import React from 'react'
import { Link } from 'react-router-dom'
import { useShoppingCart } from '../context/ShoppingCartContext'

export default function Navbar() {
    const {openCart, cartQuantity} = useShoppingCart()
	return (
		<nav className="navbar">
			<ul className="navlinks">
                <li className="navlink">
					<Link to="/">Home</Link>
				</li>
				<li className="navlink">
					<Link to="/about">About</Link>
				</li>
				<li className="navlink">
					<Link to="/store">Store</Link>
				</li>
			</ul>
            {cartQuantity > 0 && 
                <button className="btn btn-rounded" onClick={openCart}>
                    <img src="/icons/icon-shopping-cart.svg" alt="" />
                    <span className="cart-items">{cartQuantity}</span>
                </button>}
		</nav>
	)
}

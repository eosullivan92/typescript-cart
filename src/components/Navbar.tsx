import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
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
            <div className="cart-container">
                <button className="btn btn-rounded">
                    <img src="/icons/icon-shopping-cart.svg" alt="" />
                    <span className="cart-items">3</span>
                </button>
            </div>
		</nav>
	)
}

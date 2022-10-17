import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
//
import Home from './pages/Home'
import Store from './pages/Store'
import About from './pages/About'
import Navbar from './components/Navbar'

function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="container">
            <Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/store" element={<Store />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</div>
	)
}

export default App

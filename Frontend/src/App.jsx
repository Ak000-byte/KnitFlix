import React from 'react'
import Home from './pages/Home'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import Contact from './pages/Contact'
import Collection from './pages/Collection'
import Login from './pages/Login'
import Signup from './pages/Signup'
import About from './pages/About'
import Cart from './pages/Cart'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ShopContextProvider from './context/ShopContext'


const App = () => {
  return (
    <ShopContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/order" element={<Order />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element ={<Signup/>}/>
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </ShopContextProvider>
  )
}

export default App

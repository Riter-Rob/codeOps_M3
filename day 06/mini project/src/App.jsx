import React from 'react'
import './App.css'
import { CartProvider } from './CartProvider'
import Header from './components/Header'
import Menu from './components/Menu'
import CheckoutPanel from './components/CheckoutPanel'

function App() {
  return (
    <CartProvider>
      <div className='app'>
        <Header />
        <Menu />
        <CheckoutPanel />
      </div>
    </CartProvider>
  )
}

export default App

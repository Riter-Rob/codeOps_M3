import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useAuth } from '../context/AuthContext'

function Checkout() {
  const items = useCartStore((state) => state.items)
  const clear = useCartStore((state) => state.clear)
  const { user } = useAuth()
  const [submitted, setSubmitted] = useState(false)

  const total = items.reduce((s, d) => s + d.price, 0)

  function handlePlaceOrder() {
    setSubmitted(true)
    clear()
  }

  if (submitted) {
    return (
      <div className='checkout_page'>
        <h2>Order Confirmed!</h2>
        <p>Thank you, {user?.name}. Your order has been placed.</p>
        <div style={{ marginTop: '1rem' }}>
          <Link to='/menu' className='explore_btn'>
            Order More
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className='checkout_page'>
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
        <div style={{ marginTop: '1rem' }}>
          <Link to='/menu' className='explore_btn'>
            Browse Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='checkout_page'>
      <h2>Checkout</h2>
      <p style={{ marginBottom: '1rem' }}>
        Logged in as: <strong>{user?.name}</strong>
      </p>
      <ul>
        {items.map((dish, i) => (
          <li key={i} className='checkout_item'>
            <span>{dish.name}</span>
            <span>{dish.price} ETB</span>
          </li>
        ))}
      </ul>
      <div className='checkout_total'>
        <strong>Total: {total} ETB</strong>
        <button onClick={handlePlaceOrder} className='place_order_btn'>
          Place Order
        </button>
      </div>
    </div>
  )
}

export default Checkout

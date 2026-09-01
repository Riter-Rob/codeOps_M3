import React from 'react'
import { useCart } from '../context/CartContext'

function Checkout() {
  const { items, total, dispatch } = useCart()

  if (items.length === 0) {
    return (
      <div className='checkout_page'>
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className='checkout_page'>
      <h2>Checkout</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className='checkout_item'>
            <span>{item.name} x {item.qty}</span>
            <span>{item.price * item.qty} ETB</span>
            <button onClick={() => dispatch({ type: 'remove', id: item.id })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Total: {total} ETB</p>
      <button onClick={() => dispatch({ type: 'clear' })}>Clear Cart</button>
    </div>
  )
}

export default Checkout

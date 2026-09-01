import React from 'react'
import { useCart } from '../CartProvider'

function CheckoutPanel() {
  const { items, total, dispatch } = useCart()

  if (items.length === 0) return null

  return (
    <div className='checkout_panel'>
      <h3>Your Order</h3>
      <ul>
        {items.map((dish, i) => (
          <li key={i} className='checkout_item'>
            <span>{dish.name}</span>
            <span>{dish.price} ETB</span>
            <button onClick={() => dispatch({ type: 'remove', id: dish.id })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className='checkout_total'>
        <strong>Total: {total} ETB</strong>
        <button onClick={() => dispatch({ type: 'clear' })}>Clear all</button>
      </div>
    </div>
  )
}

export default CheckoutPanel

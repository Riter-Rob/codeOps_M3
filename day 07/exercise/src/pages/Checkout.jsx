import React from 'react'
import { useCartStore } from '../store/cartStore'

function Checkout() {
  const items = useCartStore((state) => state.items)
  const remove = useCartStore((state) => state.remove)
  const clear = useCartStore((state) => state.clear)

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

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
            <button onClick={() => remove(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Total: {total} ETB</p>
      <button onClick={clear}>Clear Cart</button>
    </div>
  )
}

export default Checkout

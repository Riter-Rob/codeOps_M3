import React from 'react'
import { useCartStore } from '../store/cartStore'

function CheckoutPanel() {
  const items = useCartStore((state) => state.items)
  const remove = useCartStore((state) => state.remove)
  const clear = useCartStore((state) => state.clear)

  const total = items.reduce((s, d) => s + d.price, 0)

  if (items.length === 0) return null

  return (
    <div className='checkout_panel'>
      <h3>Your Order</h3>
      <ul>
        {items.map((dish, i) => (
          <li key={i} className='checkout_item'>
            <span>{dish.name}</span>
            <span>{dish.price} ETB</span>
            <button onClick={() => remove(dish.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className='checkout_total'>
        <strong>Total: {total} ETB</strong>
        <button onClick={clear}>Clear all</button>
      </div>
    </div>
  )
}

export default CheckoutPanel

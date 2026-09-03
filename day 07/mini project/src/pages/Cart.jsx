import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../CartProvider'

function Cart() {
  const { items, total, dispatch } = useCart()

  if (items.length === 0) {
    return (
      <div className='cart_page'>
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
        <Link to='/menu' className='explore_btn'>
          Browse Menu
        </Link>
      </div>
    )
  }

  return (
    <div className='cart_page'>
      <h2>Your Cart</h2>
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
        <button onClick={() => dispatch({ type: 'clear' })}>Clear cart</button>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <Link to='/checkout' className='checkout_btn'>
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}

export default Cart

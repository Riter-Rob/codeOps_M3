import React from 'react'
import { useCart } from '../context/CartContext'

function CartBar() {
  const { items, total, dispatch } = useCart()

  return (
    <div className='cart_bar'>
      <span>Cart: {items.length} items  {total} ETB</span>
      {items.length > 0 && (
        <button onClick={() => dispatch({ type: 'clear' })}>Clear cart</button>
      )}
    </div>
  )
}

export default CartBar

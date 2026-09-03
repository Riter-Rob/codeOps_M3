import React from 'react'
import { useCartStore } from '../store/cartStore'

function CartBar() {
  const items = useCartStore((state) => state.items)
  const clear = useCartStore((state) => state.clear)

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className='cart_bar'>
      <span>Cart: {items.length} items {total} ETB</span>
      {items.length > 0 && (
        <button onClick={clear}>Clear cart</button>
      )}
    </div>
  )
}

export default CartBar

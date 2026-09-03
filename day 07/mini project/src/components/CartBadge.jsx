import React from 'react'
import { useCartStore } from '../store/cartStore'

function CartBadge() {
  const count = useCartStore((state) => state.items.length)

  return (
    <span className='cart_badge'>
      {count}
    </span>
  )
}

export default CartBadge

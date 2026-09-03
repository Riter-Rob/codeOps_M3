import React from 'react'
import { useCart } from '../CartProvider'

function CartBadge() {
  const { items } = useCart()

  return (
    <span className='cart_badge'>
      {items.length}
    </span>
  )
}

export default CartBadge

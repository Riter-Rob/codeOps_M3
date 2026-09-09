import React, { useState } from 'react'

function CartWidgetWithUseState() {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  function addItem(dish) {
    setItems(prev => [...prev, dish])
    setTotal(prev => prev + dish.price)
  }

  function clearCart() {
    setItems([])
    setTotal(0)
    setIsOpen(false)
  }

  return (
    <div>
      <button onClick={() => setIsOpen(prev => !prev)}>
        Cart ({items.length}) - {total} ETB
      </button>
      {isOpen && (
        <div>
          {items.map((item, i) => (
            <p key={i}>{item.name} - {item.price} ETB</p>
          ))}
          <button onClick={clearCart}>Clear</button>
        </div>
      )}
      <button onClick={() => addItem({ name: 'Tibs', price: 120 })}>
        Add Tibs
      </button>
    </div>
  )
}

export default CartWidgetWithUseState

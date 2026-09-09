import React, { useState } from 'react'
import { useCartStore } from '../store/cartStore'

function Checkout() {
  const items = useCartStore((state) => state.items)
  const remove = useCartStore((state) => state.remove)
  const clear = useCartStore((state) => state.clear)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    area: '',
    notes: '',
  })

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

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
            <button type='button' onClick={() => remove(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Total: {total} ETB</p>
      <button type='button' onClick={clear}>Clear Cart</button>

      <form onSubmit={handleSubmit} className='checkout_form'>
        <h3>Delivery Details</h3>

        <div>
          <input
            type='text'
            name='name'
            placeholder='Full Name'
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type='text'
            name='phone'
            placeholder='TeleBirr (09... or +2519...)'
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type='text'
            name='area'
            placeholder='Delivery Area'
            value={form.area}
            onChange={handleChange}
          />
        </div>

        <div>
          <textarea
            name='notes'
            placeholder='Optional delivery notes'
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <button type='submit'>Place Order</button>
      </form>
    </div>
  )
}

export default Checkout


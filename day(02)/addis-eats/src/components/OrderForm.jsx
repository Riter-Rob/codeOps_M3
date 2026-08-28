import React, { useState } from 'react'

// Controlled input - React state controls the input value
function OrderForm() {
  const [form, setForm] = useState({ name: '', phone: '', area: '' })
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  // Single handler for all inputs using e.target.name
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault() // prevent page reload

    // Validation
    if (!form.name || !form.phone || !form.area) {
      setMessage('Please fill all fields')
      setIsError(true)
      return
    }

    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(form.phone)) {
      setMessage('Phone number must be 10 digits')
      setIsError(true)
      return
    }

    setMessage(`Order placed for ${form.name}!`)
    setIsError(false)
    setForm({ name: '', phone: '', area: '' }) // reset form
  }

  return (
    <form className='order_form' onSubmit={handleSubmit}>
      <h3>Place Order</h3>

      <input
        type='text'
        name='name'
        placeholder='Your Name'
        value={form.name}
        onChange={handleChange}
      />

      <input
        type='text'
        name='phone'
        placeholder='Phone Number (10 digits)'
        value={form.phone}
        onChange={handleChange}
      />

      <input
        type='text'
        name='area'
        placeholder='Delivery Area'
        value={form.area}
        onChange={handleChange}
      />

      <button type='submit'>Submit Order</button>

      {message && <p className={isError ? 'message error' : 'message'}>{message}</p>}
    </form>
  )
}

export default OrderForm

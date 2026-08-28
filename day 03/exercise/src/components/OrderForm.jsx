import React, { useState } from 'react'

const TELEBIRR_RE = /^(?:\+251|0)9\d{8}$/

function OrderForm() {
  const [form, setForm] = useState({ name: '', phone: '', area: '' })
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const phoneValid = TELEBIRR_RE.test(form.phone)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!form.name || !form.area) {
      setMessage('Please fill all fields')
      setIsError(true)
      return
    }

    setMessage(`Order placed for ${form.name}!`)
    setIsError(false)
    setForm({ name: '', phone: '', area: '' })
  }

  return (
    <form className='order_form' onSubmit={handleSubmit}>
      <h3>Delivery Details</h3>

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
        placeholder='TeleBirr (09... or +2519...)'
        value={form.phone}
        onChange={handleChange}
      />
      {form.phone && !phoneValid && <p className='message error'>Use 09XXXXXXXX or +2519XXXXXXXX</p>}

      <input
        type='text'
        name='area'
        placeholder='Delivery Area'
        value={form.area}
        onChange={handleChange}
      />

      <button type='submit' disabled={!phoneValid || !form.name}>Submit Order</button>

      {message && <p className={isError ? 'message error' : 'message'}>{message}</p>}
    </form>
  )
}

export default OrderForm

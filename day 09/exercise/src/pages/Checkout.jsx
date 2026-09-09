import React, { useState, useRef } from 'react'
import { useCartStore } from '../store/cartStore'

const TELEBIRR_RE = /^(?:\+251|0)9\d{8}$/

function validate(form) {
  const errors = {}

  if (!form.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!form.phone.trim()) {
    errors.phone = 'TeleBirr phone number is required'
  } else if (!TELEBIRR_RE.test(form.phone.trim())) {
    errors.phone = 'Use 09XXXXXXXX or +2519XXXXXXXX'
  }

  if (!form.area) {
    errors.area = 'Delivery area is required'
  }

  return errors
}

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
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const nameRef = useRef(null)
  const phoneRef = useRef(null)
  const areaRef = useRef(null)

  const errors = validate(form)

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    setTouched({
      name: true,
      phone: true,
      area: true,
      notes: true,
    })

    const firstError = ['name', 'phone', 'area'].find((key) => errors[key])
    if (firstError) {
      if (firstError === 'name') nameRef.current?.focus()
      else if (firstError === 'phone') phoneRef.current?.focus()
      else if (firstError === 'area') areaRef.current?.focus()
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitError('TeleBirr payment failed: Network timeout while connecting to Ethio Telecom server.')
      phoneRef.current?.focus()
    }, 1000)
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

        {submitError && (
          <p className='error' role='alert'>
            {submitError}
          </p>
        )}

        <div>
          <label htmlFor='name'>Full Name</label>
          <input
            ref={nameRef}
            id='name'
            type='text'
            name='name'
            placeholder='Full Name'
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
          />
          {touched.name && errors.name && (
            <p id='name-error' className='error_text' role='alert'>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='phone'>TeleBirr Phone</label>
          <input
            ref={phoneRef}
            id='phone'
            type='text'
            name='phone'
            placeholder='TeleBirr (09... or +2519...)'
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(touched.phone && errors.phone)}
            aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
          />
          {touched.phone && errors.phone && (
            <p id='phone-error' className='error_text' role='alert'>
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='area'>Delivery Area</label>
          <select
            ref={areaRef}
            id='area'
            name='area'
            value={form.area}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(touched.area && errors.area)}
            aria-describedby={touched.area && errors.area ? 'area-error' : undefined}
          >
            <option value=''>Select delivery area</option>
            <option value='Bole'>Bole</option>
            <option value='Kazanchis'>Kazanchis</option>
            <option value='Megenagna'>Megenagna</option>
            <option value='Piassa'>Piassa</option>
          </select>
          {touched.area && errors.area && (
            <p id='area-error' className='error_text' role='alert'>
              {errors.area}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='notes'>Notes (Optional)</label>
          <textarea
            id='notes'
            name='notes'
            placeholder='Optional delivery notes'
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Placing Order...' : `Pay ${total} ETB via TeleBirr`}
        </button>
      </form>
    </div>
  )
}

export default Checkout


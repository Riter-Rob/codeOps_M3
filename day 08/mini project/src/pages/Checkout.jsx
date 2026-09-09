import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useAuth } from '../context/AuthContext'
import { validate } from '../validate'
import Field from '../components/Field'

const AREA_OPTIONS = [
  { value: 'Bole', label: 'Bole' },
  { value: 'Kazanchis', label: 'Kazanchis' },
  { value: 'Megenagna', label: 'Megenagna' },
  { value: 'Piassa', label: 'Piassa' },
]

function Checkout() {
  const items = useCartStore((state) => state.items)
  const clear = useCartStore((state) => state.clear)
  const { user } = useAuth()

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: '',
    area: 'Bole',
    notes: '',
  })
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const nameRef = useRef(null)
  const phoneRef = useRef(null)
  const areaRef = useRef(null)
  const notesRef = useRef(null)

  const errors = validate(form)
  const total = items.reduce((sum, dish) => sum + dish.price * (dish.qty || 1), 0)

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

    if (isSubmitting) {
      return
    }

    setTouched({
      name: true,
      phone: true,
      area: true,
      notes: true,
    })

    const errorFields = ['name', 'phone', 'area', 'notes'].filter(
      (field) => errors[field]
    )

    if (errorFields.length > 0) {
      const firstBadField = errorFields[0]
      if (firstBadField === 'name') nameRef.current?.focus()
      else if (firstBadField === 'phone') phoneRef.current?.focus()
      else if (firstBadField === 'area') areaRef.current?.focus()
      else if (firstBadField === 'notes') notesRef.current?.focus()
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitError(
        'Payment network failure: TeleBirr payment gateway timed out for phone ' +
          form.phone +
          '. All order details have been preserved. Please try again.'
      )
      phoneRef.current?.focus()
    }, 1200)
  }

  if (items.length === 0) {
    return (
      <div className='checkout_page'>
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
        <div style={{ marginTop: '1rem' }}>
          <Link to='/menu' className='explore_btn'>
            Browse Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='checkout_page'>
      <h2>Checkout</h2>
      <p style={{ marginBottom: '1rem' }}>
        Logged in as: <strong>{user?.name}</strong>
      </p>

      <ul>
        {items.map((dish, i) => (
          <li key={i} className='checkout_item'>
            <span>
              {dish.name} {dish.qty ? `x ${dish.qty}` : ''}
            </span>
            <span>{dish.price * (dish.qty || 1)} ETB</span>
          </li>
        ))}
      </ul>

      <div className='checkout_total'>
        <strong>Total: {total} ETB</strong>
        <button type='button' onClick={clear}>
          Clear all
        </button>
      </div>

      <form onSubmit={handleSubmit} className='checkout_form' noValidate>
        <h3>Delivery & TeleBirr Payment Details</h3>

        {submitError && (
          <div className='submit_error_banner' role='alert'>
            <span aria-hidden='true' className='error_icon'>
              [!]
            </span>{' '}
            <strong>Order Failed:</strong> {submitError}
          </div>
        )}

        <Field
          ref={nameRef}
          id='name'
          name='name'
          label='Full Name'
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          touched={touched.name}
          placeholder='e.g. Abebe Bikila'
        />

        <Field
          ref={phoneRef}
          id='phone'
          name='phone'
          label='TeleBirr Phone Number'
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          touched={touched.phone}
          placeholder='09XXXXXXXX or +2519XXXXXXXX'
        />

        <Field
          ref={areaRef}
          id='area'
          name='area'
          label='Delivery Area'
          as='select'
          value={form.area}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.area}
          touched={touched.area}
          options={AREA_OPTIONS}
        />

        <Field
          ref={notesRef}
          id='notes'
          name='notes'
          label='Delivery Notes (Optional)'
          as='textarea'
          value={form.notes}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.notes}
          touched={touched.notes}
          placeholder='Building name, floor, or nearby landmark'
          rows={3}
        />

        <button type='submit' disabled={isSubmitting} className='place_order_btn'>
          {isSubmitting ? 'Placing Order...' : `Pay ${total} ETB via TeleBirr`}
        </button>
      </form>
    </div>
  )
}

export default Checkout

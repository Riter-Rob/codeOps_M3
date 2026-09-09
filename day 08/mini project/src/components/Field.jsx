import React, { forwardRef } from 'react'

const Field = forwardRef(function Field(
  {
    id,
    label,
    name,
    type = 'text',
    value,
    onChange,
    onBlur,
    placeholder,
    options,
    error,
    touched,
    as = 'input',
    rows,
  },
  ref
) {
  const showError = Boolean(touched && error)
  const errorId = `${id}-error`

  return (
    <div className={`form_field ${showError ? 'has_error' : ''}`}>
      <label htmlFor={id} className='field_label'>
        {label}
      </label>

      {as === 'select' ? (
        <select
          ref={ref}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={showError}
          aria-describedby={showError ? errorId : undefined}
          className='field_input'
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : as === 'textarea' ? (
        <textarea
          ref={ref}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={showError}
          aria-describedby={showError ? errorId : undefined}
          rows={rows || 3}
          className='field_input'
        />
      ) : (
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={showError}
          aria-describedby={showError ? errorId : undefined}
          className='field_input'
        />
      )}

      {showError && (
        <div id={errorId} className='field_error' role='alert'>
          <span aria-hidden='true' className='error_icon'>
            [!]
          </span>{' '}
          {error}
        </div>
      )}
    </div>
  )
})

export default Field

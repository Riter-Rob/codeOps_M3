import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [name, setName] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const destination = location.state?.from?.pathname || '/checkout'

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    login(name.trim())
    navigate(destination, { replace: true })
  }

  return (
    <div className='login_page'>
      <h2>Sign In</h2>
      <p>Please enter your name to sign in and continue.</p>
      <form onSubmit={handleSubmit} className='login_form'>
        <input
          type='text'
          placeholder='Your name...'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button type='submit'>Sign In</button>
      </form>
    </div>
  )
}

export default Login

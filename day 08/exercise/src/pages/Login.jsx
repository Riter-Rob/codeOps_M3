import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [username, setUsername] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/checkout'

  function handleSubmit(e) {
    e.preventDefault()
    if (!username.trim()) return
    login(username)
    navigate(from, { replace: true })
  }

  return (
    <div className='login_page'>
      <h2>Sign In</h2>
      <p>Please sign in to proceed to checkout.</p>
      <form onSubmit={handleSubmit} className='login_form'>
        <input
          type='text'
          placeholder='Enter your name'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type='submit'>Sign In</button>
      </form>
    </div>
  )
}

export default Login

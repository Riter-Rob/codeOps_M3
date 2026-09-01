import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { items } = useCart()
  const { user, logout } = useAuth()

  return (
    <nav className='navbar'>
      <Link to='/' className='brand_link'>
        Addis Eats
      </Link>
      <div className='nav_links'>
        <NavLink
          to='/'
          end
          className={({ isActive }) => (isActive ? 'nav_item active' : 'nav_item')}
        >
          Home
        </NavLink>
        <NavLink
          to='/menu'
          className={({ isActive }) => (isActive ? 'nav_item active' : 'nav_item')}
        >
          Menu
        </NavLink>
        <NavLink
          to='/checkout'
          className={({ isActive }) => (isActive ? 'nav_item active' : 'nav_item')}
        >
          Checkout ({items.length})
        </NavLink>
        {user ? (
          <span className='user_box'>
            <span>{user.name}</span>
            <button onClick={logout} className='logout_btn'>Logout</button>
          </span>
        ) : (
          <NavLink
            to='/login'
            className={({ isActive }) => (isActive ? 'nav_item active' : 'nav_item')}
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  )
}

export default Navbar

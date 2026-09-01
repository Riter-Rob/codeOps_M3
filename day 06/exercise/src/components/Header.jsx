import React from 'react'
import { useTheme } from '../context/ThemeContext'

function ThemeBadge() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme} className='theme_btn'>
      Mode: {theme}
    </button>
  )
}

function Header() {
  return (
    <div className='header'>
      <h1>Addis Eats</h1>
      <h2>Day 05 Exercise - Context, Hooks, Reducers & Memo</h2>
      <ThemeBadge />
    </div>
  )
}

export default Header

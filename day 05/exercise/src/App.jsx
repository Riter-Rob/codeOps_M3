import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Header from './components/Header'
import CategoryBar from './components/CategoryBar'
import DishList from './components/DishList'
import CartBar from './components/CartBar'
import SpecialsPanel from './components/SpecialsPanel'
import useFetch from './hooks/useFetch'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'

const CATS = ['All', 'Main', 'Vegan', 'Grill']

function AppContent() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const searchRef = useRef(null)
  const { theme } = useTheme()

  const { data: dishes, loading, error } = useFetch('/dishes.json')

  const shown = dishes
    .filter(d => category === 'All' || d.category === category)
    .filter(d => d.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    document.title = `Addis Eats - ${shown.length} dishes`
  }, [shown])

  useEffect(() => {
    searchRef.current.focus()
  }, [])

  return (
    <div className={`app ${theme}`}>
      <Header />
      <CartBar />
      <SpecialsPanel />
      <input
        ref={searchRef}
        className='search_input'
        type='text'
        placeholder='Search dishes...'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <CategoryBar cats={CATS} selected={category} onSelect={setCategory} />
      <DishList dishes={shown} loading={loading} error={error} />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  )
}

export default App

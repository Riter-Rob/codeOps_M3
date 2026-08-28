import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Header from './components/Header'
import CategoryBar from './components/CategoryBar'
import DishList from './components/DishList'

const CATS = ['All', 'Main', 'Vegan', 'Grill']

function App() {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const searchRef = useRef(null)

  useEffect(() => {
    const ctrl = new AbortController()
    setLoading(true)
    setError(null)

    async function fetchDishes() {
      try {
        const res = await fetch('/dishes.json', { signal: ctrl.signal })
        if (!res.ok) throw new Error('Could not load the menu')
        const data = await res.json()
        setDishes(data)
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDishes()

    return () => ctrl.abort()
  }, [category])

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
    <div className='app'>
      <Header />
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

export default App

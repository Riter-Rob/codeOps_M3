import React, { useState, useRef, useEffect } from 'react'
import CategoryBar from './CategoryBar'
import DishList from './DishList'
import useFetch from '../hooks/useFetch'

const CATS = ['All', 'Main', 'Vegan', 'Grill']

function Menu() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const searchRef = useRef(null)

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
    <div>
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

export default Menu

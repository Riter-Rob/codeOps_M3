import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import CategoryBar from '../components/CategoryBar'
import DishList from '../components/DishList'
import useFetch from '../hooks/useFetch'

const CATS = ['All', 'Main', 'Vegan', 'Grill']

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || 'All'
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
    if (searchRef.current) {
      searchRef.current.focus()
    }
  }, [])

  function handleCategorySelect(cat) {
    if (cat === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ category: cat })
    }
  }

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
      <CategoryBar
        cats={CATS}
        selected={category}
        onSelect={handleCategorySelect}
      />
      <DishList dishes={shown} loading={loading} error={error} />
    </div>
  )
}

export default Menu

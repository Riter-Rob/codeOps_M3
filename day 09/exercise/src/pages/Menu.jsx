import React, { useState, useEffect, useRef, Profiler } from 'react'
import { useSearchParams } from 'react-router-dom'
import CategoryBar from '../components/CategoryBar'
import DishList from '../components/DishList'
import useFetch from '../hooks/useFetch'

const CATS = ['All', 'Main', 'Vegan', 'Grill']

function onRenderCallback(id, phase, actualDuration, baseDuration) {
  console.log(`[Profiler: ${id}] ${phase} phase: ${actualDuration.toFixed(2)}ms (base: ${baseDuration.toFixed(2)}ms)`)
}

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || 'All'
  const [search, setSearch] = useState('')
  const [crash, setCrash] = useState(false)
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
      <div className='menu_top_bar'>
        <input
          ref={searchRef}
          className='search_input'
          type='text'
          placeholder='Search dishes...'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          type='button'
          onClick={() => setCrash(prev => !prev)}
          className='test_crash_btn'
        >
          {crash ? 'Disable Crash' : 'Test ErrorBoundary'}
        </button>
      </div>
      <CategoryBar
        cats={CATS}
        selected={category}
        onSelect={handleCategorySelect}
      />
      <Profiler id='DishList' onRender={onRenderCallback}>
        <DishList dishes={shown} loading={loading} error={error} crash={crash} />
      </Profiler>
    </div>
  )
}

export default Menu

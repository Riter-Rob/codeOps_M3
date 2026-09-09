import React from 'react'
import useFetch from '../hooks/useFetch'

function SpecialsPanel() {
  const { data, loading, error } = useFetch('/dishes.json')

  if (loading) return <p className='loading'>Loading specials...</p>
  if (error) return <p className='error'>{error}</p>

  const specials = data.slice(0, 2)

  return (
    <div className='specials_panel'>
      <h3>Today's Specials</h3>
      {specials.map(dish => (
        <p key={dish.id}>{dish.name} — {dish.price} ETB</p>
      ))}
    </div>
  )
}

export default SpecialsPanel

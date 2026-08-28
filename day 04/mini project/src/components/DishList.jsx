import React from 'react'
import Dish from './Dish'

function DishList({ dishes, loading, error }) {
  if (loading) return <p className='loading'>Loading the menu...</p>
  if (error) return <p className='error'>{error}</p>
  if (dishes.length === 0) return <p className='empty_state'>No dishes found.</p>

  return (
    <div className='card_container'>
      {dishes.map(dish => (
        <Dish key={dish.id} name={dish.name} price={dish.price} spicy={dish.spicy} />
      ))}
    </div>
  )
}

export default DishList

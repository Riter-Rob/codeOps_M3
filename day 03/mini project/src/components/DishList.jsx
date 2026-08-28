import React from 'react'
import Dish from './Dish'

function DishList({ dishes, onAdd }) {
  if (dishes.length === 0) {
    return <p className='empty_state'>No dishes in this category yet.</p>
  }

  return (
    <div className='card_container'>
      {dishes.map(dish => (
        <Dish
          key={dish.id}
          name={dish.name}
          price={dish.price}
          spicy={dish.spicy}
          onAdd={onAdd}
        />
      ))}
    </div>
  )
}

export default DishList

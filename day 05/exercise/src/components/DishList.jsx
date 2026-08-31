import React, { useCallback } from 'react'
import Dish from './Dish'
import { useCart } from '../context/CartContext'

function DishList({ dishes, loading, error }) {
  const { dispatch } = useCart()

  const handleAdd = useCallback((dish) => {
    dispatch({ type: 'add', dish })
  }, [dispatch])

  if (loading) return <p className='loading'>Loading the menu...</p>
  if (error) return <p className='error'>{error}</p>
  if (dishes.length === 0) return <p className='empty_state'>No dishes in this category yet.</p>

  return (
    <div className='card_container'>
      {dishes.map(dish => (
        <Dish key={dish.id} name={dish.name} price={dish.price} spicy={dish.spicy} onAdd={() => handleAdd(dish)} />
      ))}
    </div>
  )
}

export default DishList

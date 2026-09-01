import React from 'react'
import { useParams, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useCart } from '../CartProvider'

function DishDetail() {
  const { id } = useParams()
  const { data: dishes, loading, error } = useFetch('/dishes.json')
  const { dispatch } = useCart()

  if (loading) return <p className='loading'>Loading dish...</p>
  if (error) return <p className='error'>{error}</p>

  const dish = dishes && dishes.find(d => String(d.id) === String(id))

  if (!dish) {
    return (
      <div className='dish_detail'>
        <h2>Dish not found</h2>
        <p>We could not find the dish you were looking for.</p>
        <Link to='/menu'>Back to Menu</Link>
      </div>
    )
  }

  return (
    <div className='dish_detail'>
      <h2>{dish.name}</h2>
      <p>Category: {dish.category}</p>
      <p>Price: {dish.price} ETB</p>
      {dish.spicy && <p><em>Spicy</em></p>}
      <button onClick={() => dispatch({ type: 'add', dish })}>
        Add to cart
      </button>
      <div style={{ marginTop: '1rem' }}>
        <Link to='/menu'>Back to Menu</Link>
      </div>
    </div>
  )
}

export default DishDetail

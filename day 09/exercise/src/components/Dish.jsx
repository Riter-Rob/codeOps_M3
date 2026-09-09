import React from 'react'
import { Link } from 'react-router-dom'

function Dish({ dish, onAdd }) {
  const { id, name, price, spicy } = dish

  if (name === 'Kitfo') {
    throw new Error('Deliberate error in Kitfo dish')
  }

  return (
    <div className='card'>
      <Link to={`/menu/${id}`} className='dish_link'>
        <h2>{name}</h2>
      </Link>
      <p>{price} ETB</p>
      {spicy && <p><em>Spicy</em></p>}
      <button onClick={() => onAdd(dish)}>Add to cart</button>
    </div>
  )
}

export default React.memo(Dish)

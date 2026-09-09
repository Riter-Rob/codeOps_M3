import React from 'react'
import { Link } from 'react-router-dom'

function Dish({ id, name, price, spicy, onAdd }) {
  return (
    <div className='card'>
      <Link to={`/menu/${id}`} className='dish_link'>
        <h2>{name}</h2>
      </Link>
      <p>{price} ETB</p>
      {spicy && <p><em>Spicy</em></p>}
      <button onClick={onAdd}>Add to cart</button>
    </div>
  )
}

export default React.memo(Dish)

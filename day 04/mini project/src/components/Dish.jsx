import React from 'react'

function Dish({ name, price, spicy }) {
  return (
    <div className='card'>
      <h2>{name}</h2>
      <p>{price} ETB</p>
      {spicy && <p><em>Spicy</em></p>}
    </div>
  )
}

export default Dish

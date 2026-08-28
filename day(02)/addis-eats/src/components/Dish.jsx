import React from 'react'

function Dish({ title, price, category, spicy, onAdd }) {
  return (
    <div className='card'>
      <h2>{title}</h2>
      <p>{price} ETB</p>
      <p>{category}</p>
      {spicy && <p><em>Spicy</em></p>}
      <button onClick={() => onAdd(price)}>Add</button>
    </div>
  )
}

export default Dish

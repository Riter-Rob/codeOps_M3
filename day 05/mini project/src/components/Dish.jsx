import React from 'react'

function Dish({ name, price, spicy, onAdd }) {
  return (
    <div className='card'>
      <h2>{name}</h2>
      <p>{price} ETB</p>
      {spicy && <p><em>Spicy</em></p>}
      <button onClick={onAdd}>Add to cart</button>
    </div>
  )
}

export default React.memo(Dish)

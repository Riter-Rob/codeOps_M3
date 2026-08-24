import React from 'react'

function Dish({ name, price }) {
  return (
    <article className="dish">
      <div>
        <h2>{name}</h2>
        <p>Price: {price} ETB</p>
      </div>
    </article>
  )
}

export default Dish
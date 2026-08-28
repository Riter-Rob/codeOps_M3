import React, { useState } from 'react'

function Dish({ name, price, spicy, onAdd }) {
  const [count, setCount] = useState(0)

  function handleAdd() {
    setCount(count + 1)
    onAdd(price)
  }

  return (
    <div className='card'>
      <h2>{name} {count > 0 && <span>x{count}</span>}</h2>
      <p>{price} ETB</p>
      {spicy && <p><em>Spicy</em></p>}
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Dish

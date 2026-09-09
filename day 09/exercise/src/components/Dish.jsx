import React from 'react'
import { Link } from 'react-router-dom'

function Dish({ dish, onAdd, onOpenModal, crash }) {
  const { id, name, price, spicy } = dish

  if (crash && name === 'Kitfo') {
    throw new Error('Deliberate error in Kitfo dish (ErrorBoundary test)')
  }

  return (
    <div className='card'>
      <Link to={`/menu/${id}`} className='dish_link'>
        <h2>{name}</h2>
      </Link>
      <p>{price} ETB</p>
      {spicy && <p><em>Spicy</em></p>}
      <div className='card_btns'>
        <button type='button' onClick={() => onAdd(dish)}>
          Add to cart
        </button>
        <button
          type='button'
          onClick={(e) => onOpenModal(dish, e.currentTarget)}
          className='view_btn'
        >
          Quick View
        </button>
      </div>
    </div>
  )
}

export default React.memo(Dish)

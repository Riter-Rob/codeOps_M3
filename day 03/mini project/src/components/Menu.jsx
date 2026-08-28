import React, { useState } from 'react'
import CategoryBar from './CategoryBar'
import DishList from './DishList'
import OrderForm from './OrderForm'

const CATS = ['All', 'Main', 'Vegan', 'Grill']

function Menu({ dishes }) {
  const [category, setCategory] = useState('All')
  const [total, setTotal] = useState(0)

  const shown = category === 'All' ? dishes : dishes.filter(d => d.category === category)

  function handleAdd(price) {
    setTotal(prev => prev + price)
  }

  return (
    <div>
      <CategoryBar cats={CATS} selected={category} onSelect={setCategory} />
      <DishList dishes={shown} onAdd={handleAdd} />
      <div className='order_total'>
        <p>Order total: <strong>{total} ETB</strong></p>
      </div>
      <OrderForm />
    </div>
  )
}

export default Menu

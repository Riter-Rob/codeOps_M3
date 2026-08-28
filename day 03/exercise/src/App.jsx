import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import CategoryBar from './components/CategoryBar'
import DishList from './components/DishList'
import OrderForm from './components/OrderForm'
import { dishes } from './data'

const CATS = ['All', 'Main', 'Vegan', 'Grill']

function App() {
  const [category, setCategory] = useState('All')
  const [total, setTotal] = useState(0)

  const shown = category === 'All' ? dishes : dishes.filter(d => d.category === category)

  function handleAdd(price) {
    setTotal(prev => prev + price)
  }

  return (
    <div className='app'>
      <Header />
      <CategoryBar cats={CATS} selected={category} onSelect={setCategory} />
      <DishList dishes={shown} onAdd={handleAdd} />
      <div className='order_total'>
        <p>Order total: <strong>{total} ETB</strong></p>
      </div>
      <OrderForm />
    </div>
  )
}

export default App

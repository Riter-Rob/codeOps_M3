import React, { useState, useEffect } from 'react'
import Dish from './Dish'
import CategoryBar from './CategoryBar'
import OrderForm from './OrderForm'



function Main({ total, setTotal }) {
  const [category, setCategory] = useState('All')
  const [menu, setMenu] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/menu.json')
        const data = await response.json()
        console.log(data)
        setMenu(data.items)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData()
  }, [])

  function addToOrder(price) {
    setTotal(prev => prev + price)
  }

  const filtered = category === 'All'
    ? menu
    : menu.filter(item => item.category === category)


  return (
    <div>
      <CategoryBar category={category} setCategory={setCategory} />

      <div className='card_container'>
        {filtered.map(dish => (
          <Dish
            key={dish.id}
            title={dish.name}
            price={dish.price}
            category={dish.category}
            spicy={dish.isSpicy}
            onAdd={addToOrder}
          />
        ))}
      </div>

      <OrderForm />
    </div>
  )
}

export default Main

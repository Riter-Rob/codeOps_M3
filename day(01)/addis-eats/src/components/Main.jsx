import React from 'react'
import Cards from './Cards'
const menu = [
  {
    title: 'Spaghetti', 
    description: 'A classic Italian pasta dish made with spaghetti noodles and a tomato-based sauce, often served with meatballs or vegetables.'
  }]
  
export default function Main() {
  return (
    <div className='card_container'>
         <Cards title={menu[0].title} description={menu[0].description} />
    </div>
   
  )
}

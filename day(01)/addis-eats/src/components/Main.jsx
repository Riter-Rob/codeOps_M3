import React from 'react'
import Dish from './Dish'
const menu=[
  {name:'Spaghetti',price:120},
  {name:'Pizza',price:150},
  {name:'Burger',price:200}
];
  
export default function Main() {
  return (
    <div className='card_container'>
      {menu.map((item,index) => (
         <Dish key={index} name={item.name} price={item.price} />
      ))}
    </div>
   
  )
}

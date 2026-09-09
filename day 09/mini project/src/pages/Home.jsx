import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='home_page'>
      <h2>Welcome to Addis Eats</h2>
      <p>Discover traditional Ethiopian cuisine delivered to your doorstep.</p>
      <Link to='/menu' className='explore_btn'>
        Explore Menu
      </Link>
    </div>
  )
}

export default Home

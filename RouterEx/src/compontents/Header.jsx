import React from 'react'

import { Link } from 'react-router-dom'
function Header() {
  return (
    <div class='header'><h1>Student Portal</h1>
    <nav>
        <Link to ='/'>Home</Link> |
        <Link to='/Courses'>Courses</Link> |
        <Link to='/Students'>Students</Link> |
        <Link to='/Profile'>Profile</Link>
    </nav>
    </div>
  )
}

export default Header
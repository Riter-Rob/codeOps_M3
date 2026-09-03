import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='not_found'>
      <h2>404 - Page Not Found</h2>
      <p>The page you requested could not be found.</p>
      <div style={{ marginTop: '1rem' }}>
        <Link to='/' className='explore_btn'>
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound

import React from 'react'
import { Link } from 'react-router-dom'

function Receipt() {
  return (
    <div className='receipt_page'>
      <h2>Order Receipt</h2>
      <p>Thank you! Your order has been placed and confirmed.</p>
      <div style={{ marginTop: '1rem' }}>
        <Link to='/menu' className='explore_btn'>
          Order More Food
        </Link>
      </div>
    </div>
  )
}

export default Receipt

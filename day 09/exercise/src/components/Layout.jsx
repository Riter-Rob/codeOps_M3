import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import CartBar from './CartBar'
import ErrorBoundary from './ErrorBoundary'

function Layout() {
  return (
    <div className='layout'>
      <Header />
      <Navbar />
      <ErrorBoundary fallback={<div className='error'>Cart panel is currently unavailable.</div>}>
        <CartBar />
      </ErrorBoundary>
      <main className='main_content'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout

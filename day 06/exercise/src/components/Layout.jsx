import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <div className='layout'>
      <Header />
      <Navbar />
      <main className='main_content'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout

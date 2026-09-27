import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './compontents/Header'
import Footer from './compontents/Footer'

function Layout() {
  return (
    <div>
      <Header />
      <Outlet/>
      <Footer />
    </div>
  )
}

export default Layout
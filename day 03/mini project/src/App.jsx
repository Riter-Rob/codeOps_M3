import React from 'react'
import './App.css'
import Header from './components/Header'
import Menu from './components/Menu'
import { dishes } from './data'

function App() {
  return (
    <div className='app'>
      <Header />
      <Menu dishes={dishes} />
    </div>
  )
}

export default App

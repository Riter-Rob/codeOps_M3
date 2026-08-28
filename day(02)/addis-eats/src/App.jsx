import React, { useState } from 'react'
import './css/styles.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'

function App() {
  // total state lives here so Header and Main can both access it
  const [total, setTotal] = useState(0)

  return (
    <div>
      <Header total={total} />
      <Main total={total} setTotal={setTotal} />
      <Footer />
    </div>
  )
}

export default App

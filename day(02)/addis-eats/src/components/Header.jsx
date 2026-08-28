import React, { useEffect } from 'react'

function Header({ total }) {

  // useEffect - side effect: update browser tab title when total changes
  useEffect(() => {
    document.title = `Addis Eats - Total: ${total} ETB`
  }, [total])

  return (
    <div className='header'>
      <h1>My First React App</h1>
      <h2>Addis Eats - Our Menu</h2>
      <p>Total : {total}</p>
    </div>
  )
}

export default Header
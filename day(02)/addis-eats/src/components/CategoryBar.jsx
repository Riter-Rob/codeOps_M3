import React from 'react'

function CategoryBar({ category, setCategory }) {
  const categories = ['All', 'Main Dish', 'Side Dish', 'Beverage']

  return (
    <div className='category_bar'>
      {categories.map(cat => (
        <button
          key={cat}
          className={category === cat ? 'active' : ''}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default CategoryBar

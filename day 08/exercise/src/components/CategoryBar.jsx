import React from 'react'

function CategoryBar({ cats, selected, onSelect }) {
  return (
    <div className='category_bar'>
      {cats.map(cat => (
        <button
          key={cat}
          className={cat === selected ? 'active' : ''}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default CategoryBar

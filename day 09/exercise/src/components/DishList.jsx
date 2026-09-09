import React, { useState, useRef, useCallback } from 'react'
import Dish from './Dish'
import DishModal from './DishModal'
import { useCartStore } from '../store/cartStore'

function DishList({ dishes, loading, error, crash }) {
  const addItem = useCartStore((state) => state.addItem)
  const [activeDish, setActiveDish] = useState(null)
  const triggerRef = useRef(null)

  const handleAdd = useCallback((dish) => {
    addItem(dish)
  }, [addItem])

  const handleOpenModal = useCallback((dish, element) => {
    triggerRef.current = element
    setActiveDish(dish)
  }, [])

  const handleCloseModal = useCallback(() => {
    setActiveDish(null)
  }, [])

  if (loading) return <p className='loading'>Loading the menu...</p>
  if (error) return <p className='error'>{error}</p>
  if (dishes.length === 0) return <p className='empty_state'>No dishes in this category yet.</p>

  return (
    <>
      <div className='card_container'>
        {dishes.map(dish => (
          <Dish
            key={dish.id}
            dish={dish}
            onAdd={handleAdd}
            onOpenModal={handleOpenModal}
            crash={crash}
          />
        ))}
      </div>

      <DishModal
        isOpen={Boolean(activeDish)}
        dish={activeDish}
        onClose={handleCloseModal}
        triggerRef={triggerRef}
      />
    </>
  )
}

export default DishList

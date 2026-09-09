import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function DishModal({ isOpen, dish, onClose, triggerRef }) {
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    closeBtnRef.current?.focus()

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      triggerRef?.current?.focus()
    }
  }, [isOpen, onClose, triggerRef])

  if (!isOpen || !dish) return null

  return createPortal(
    <div className='modal_backdrop' onClick={onClose} role='presentation'>
      <div
        className='modal_content'
        role='dialog'
        aria-modal='true'
        aria-labelledby='dish-modal-title'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id='dish-modal-title'>{dish.name}</h2>
        <p className='modal_price'>{dish.price} ETB</p>
        <p className='modal_category'>Category: {dish.category}</p>
        {dish.spicy && <p className='modal_spicy'><em>Spicy</em></p>}
        <p className='modal_desc'>
          Traditional Ethiopian specialty prepared with authentic ingredients.
        </p>
        <div className='modal_actions'>
          <button ref={closeBtnRef} onClick={onClose} className='close_btn'>
            Close (Esc)
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default DishModal

import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function DishModal({ isOpen, dish, onClose, triggerRef }) {
  const modalRef = useRef(null)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    closeBtnRef.current?.focus()

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable || focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
      triggerRef?.current?.focus()
    }
  }, [isOpen, onClose, triggerRef])

  if (!isOpen || !dish) return null

  return createPortal(
    <div className='modal_backdrop' onClick={onClose} role='presentation'>
      <div
        ref={modalRef}
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

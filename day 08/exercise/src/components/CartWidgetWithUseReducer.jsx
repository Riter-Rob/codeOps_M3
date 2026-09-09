import React, { useReducer } from 'react'

function cartWidgetReducer(state, action) {
  if (action.type === 'add') {
    return {
      items: [...state.items, action.dish],
      total: state.total + action.dish.price,
      isOpen: state.isOpen,
    }
  }

  if (action.type === 'clear') {
    return {
      items: [],
      total: 0,
      isOpen: false,
    }
  }

  if (action.type === 'toggle') {
    return {
      ...state,
      isOpen: !state.isOpen,
    }
  }

  return state
}

const initialState = {
  items: [],
  total: 0,
  isOpen: false,
}

function CartWidgetWithUseReducer() {
  const [state, dispatch] = useReducer(cartWidgetReducer, initialState)

  return (
    <div>
      <button onClick={() => dispatch({ type: 'toggle' })}>
        Cart ({state.items.length}) - {state.total} ETB
      </button>
      {state.isOpen && (
        <div>
          {state.items.map((item, i) => (
            <p key={i}>{item.name} - {item.price} ETB</p>
          ))}
          <button onClick={() => dispatch({ type: 'clear' })}>Clear</button>
        </div>
      )}
      <button onClick={() => dispatch({ type: 'add', dish: { name: 'Tibs', price: 120 } })}>
        Add Tibs
      </button>
    </div>
  )
}

export default CartWidgetWithUseReducer

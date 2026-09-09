import React, { createContext, useContext, useReducer, useMemo } from 'react'
import cartReducer from '../reducers/cartReducer'

const CartContext = createContext()

function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [])

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  const value = useMemo(() => {
    return { items, dispatch, total }
  }, [items, total])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export { CartProvider, useCart }

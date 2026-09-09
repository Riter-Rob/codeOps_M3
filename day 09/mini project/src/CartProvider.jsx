import React, { createContext, useContext, useReducer, useMemo } from 'react'
import cartReducer from './cartReducer'

const CartContext = createContext()

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const total = state.items.reduce((s, d) => s + d.price, 0)

  const value = useMemo(
    () => ({ items: state.items, dispatch, total }),
    [state.items, total]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

function useCart() {
  return useContext(CartContext)
}

export { CartProvider, useCart }

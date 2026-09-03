import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        existing.qty += 1
      } else {
        state.items.push({ ...action.payload, qty: 1 })
      }
    },
    remove: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
    clear: (state) => {
      state.items = []
    },
  },
})

export const { addItem, remove, clear } = cartSlice.actions
export default cartSlice.reducer

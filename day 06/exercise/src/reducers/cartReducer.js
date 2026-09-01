function cartReducer(state, action) {
  if (action.type === 'add') {
    const existing = state.find(item => item.id === action.dish.id)
    if (existing) {
      return state.map(item =>
        item.id === action.dish.id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    }
    return [...state, { ...action.dish, qty: 1 }]
  }

  if (action.type === 'remove') {
    return state.filter(item => item.id !== action.id)
  }

  if (action.type === 'clear') {
    return []
  }

  return state
}

const state0 = []
const state1 = cartReducer(state0, { type: 'add', dish: { id: 1, name: 'Tibs', price: 120 } })
const state2 = cartReducer(state1, { type: 'add', dish: { id: 2, name: 'Shiro', price: 80 } })
const state3 = cartReducer(state2, { type: 'add', dish: { id: 1, name: 'Tibs', price: 120 } })
const state4 = cartReducer(state3, { type: 'remove', id: 2 })
const state5 = cartReducer(state4, { type: 'clear' })

console.log('add Tibs:', state1)
console.log('add Shiro:', state2)
console.log('add Tibs again (qty++):', state3)
console.log('remove Shiro:', state4)
console.log('clear all:', state5)

export default cartReducer

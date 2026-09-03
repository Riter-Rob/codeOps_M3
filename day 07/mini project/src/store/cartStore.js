import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (dish) => set((s) => ({ items: [...s.items, dish] })),
      remove: (id) =>
        set((s) => ({
          items: s.items.filter((d) => d.id !== id),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'addis-eats-cart',
    }
  )
)

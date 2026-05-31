import { create } from 'zustand'
import cartItems from '../constants/cartItems'
import type { CartItem } from './features/cart/cartSlice'

interface CartStore {
  // 상태
  cartItems: CartItem[]
  amount: number
  total: number

  // 액션
  increase: (id: string) => void
  decrease: (id: string) => void
  removeItem: (id: string) => void
  clearCart: () => void
  calculateTotals: () => void
}

const useCartStore = create<CartStore>((set) => ({
  // 초기값 (기존 Redux 상태 그대로)
  cartItems,
  amount: 0,
  total: 0,

  increase: (id) =>
    set((state) => {
      const items = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      )
      return { cartItems: items }
    }),

  decrease: (id) =>
    set((state) => {
      const items = state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0)
      return { cartItems: items }
    }),

  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cartItems: [], amount: 0, total: 0 }),

  calculateTotals: () =>
    set((state) => {
      const { amount, total } = state.cartItems.reduce(
        (acc, item) => {
          acc.amount += item.amount
          acc.total += Number(item.price) * item.amount
          return acc
        },
        { amount: 0, total: 0 }
      )
      return { amount, total }
    }),
}))

export default useCartStore
import { create } from 'zustand'
import mockCartItems from '../constants/cartItems'
import type { CartItem } from '../types/cartItem'

export interface CartState {
  cartItems: CartItem[]
  amount: number
  total: number
}

export interface CartActions {
  increase: (id: string) => void
  decrease: (id: string) => void
  removeItem: (id: string) => void
  clearCart: () => void
  calculateTotals: () => void
}

export type CartStore = CartState & CartActions

function recalculateTotals(cartItems: CartItem[]): Pick<CartState, 'amount' | 'total'> {
  return {
    amount: cartItems.reduce((sum, item) => sum + item.amount, 0),
    total: cartItems.reduce(
      (sum, item) => sum + Number(item.price) * item.amount,
      0,
    ),
  }
}

function createInitialState(): CartState {
  const cartItems = mockCartItems.map((item) => ({ ...item }))
  return {
    cartItems,
    ...recalculateTotals(cartItems),
  }
}

export const useCartStore = create<CartStore>((set) => ({
  ...createInitialState(),

  increase: (id) =>
    set((state) => {
      const item = state.cartItems.find((i) => i.id === id)
      if (!item) return state

      const cartItems = state.cartItems.map((i) =>
        i.id === id ? { ...i, amount: i.amount + 1 } : i,
      )
      return { cartItems, ...recalculateTotals(cartItems) }
    }),

  decrease: (id) =>
    set((state) => {
      const item = state.cartItems.find((i) => i.id === id)
      if (!item) return state

      const nextAmount = item.amount - 1
      const cartItems =
        nextAmount < 1
          ? state.cartItems.filter((i) => i.id !== id)
          : state.cartItems.map((i) =>
              i.id === id ? { ...i, amount: nextAmount } : i,
            )

      return { cartItems, ...recalculateTotals(cartItems) }
    }),

  removeItem: (id) =>
    set((state) => {
      const cartItems = state.cartItems.filter((i) => i.id !== id)
      return { cartItems, ...recalculateTotals(cartItems) }
    }),

  clearCart: () =>
    set({
      cartItems: [],
      amount: 0,
      total: 0,
    }),

  calculateTotals: () =>
    set((state) => recalculateTotals(state.cartItems)),
}))

export const selectCartItems = (state: CartStore) => state.cartItems
export const selectAmount = (state: CartStore) => state.amount
export const selectTotal = (state: CartStore) => state.total

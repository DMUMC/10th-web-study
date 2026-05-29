import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import mockCartItems from '../constants/cartItems'
import type { CartItem } from '../types/cartItem'
import type { RootState } from './store'

export interface CartState {
  cartItems: CartItem[]
  amount: number
  total: number
}

function recalculateTotals(state: CartState) {
  state.amount = state.cartItems.reduce((sum, item) => sum + item.amount, 0)
  state.total = state.cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.amount,
    0,
  )
}

function createInitialState(): CartState {
  const state: CartState = {
    cartItems: mockCartItems.map((item) => ({ ...item })),
    amount: 0,
    total: 0,
  }
  recalculateTotals(state)
  return state
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: createInitialState(),
  reducers: {
    increase: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((i) => i.id === action.payload)
      if (item) {
        item.amount += 1
        recalculateTotals(state)
      }
    },
    decrease: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((i) => i.id === action.payload)
      if (!item) return

      item.amount -= 1
      if (item.amount < 1) {
        state.cartItems = state.cartItems.filter((i) => i.id !== action.payload)
      }
      recalculateTotals(state)
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload)
      recalculateTotals(state)
    },
    clearCart: (state) => {
      state.cartItems = []
      state.amount = 0
      state.total = 0
    },
    calculateTotals: (state) => {
      recalculateTotals(state)
    },
  },
})

export const {
  increase,
  decrease,
  removeItem,
  clearCart,
  calculateTotals,
} = cartSlice.actions

export const selectCartItems = (state: RootState) => state.cart.cartItems
export const selectAmount = (state: RootState) => state.cart.amount
export const selectTotal = (state: RootState) => state.cart.total

export default cartSlice.reducer

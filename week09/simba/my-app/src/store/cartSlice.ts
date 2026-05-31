import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import cartItems from '../constants/cartItems'

export interface CartItem {
  id: string
  title: string
  singer: string
  price: string
  img: string
  amount: number
}

interface CartState {
  cartItems: CartItem[]
  amount: number
  total: number
}

const initialState: CartState = {
  cartItems,
  amount: 0,
  total: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 수량 증가
    increase: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((i) => i.id === action.payload)
      if (item) item.amount += 1
    },

    // 수량 감소 — 1보다 작아지면 자동 제거
    decrease: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((i) => i.id === action.payload)
      if (item) {
        item.amount -= 1
        if (item.amount < 1) {
          state.cartItems = state.cartItems.filter(
            (i) => i.id !== action.payload
          )
        }
      }
    },

    // 특정 아이템 제거
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.id !== action.payload
      )
    },

    // 전체 삭제
    clearCart: (state) => {
      state.cartItems = []
      state.amount = 0
      state.total = 0
    },

    // 전체 합계 계산 — increase/decrease/removeItem 후 호출
    calculateTotals: (state) => {
      const { amount, total } = state.cartItems.reduce(
        (acc, item) => {
          acc.amount += item.amount
          acc.total += Number(item.price) * item.amount
          return acc
        },
        { amount: 0, total: 0 }
      )
      state.amount = amount
      state.total = total
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

export default cartSlice.reducer
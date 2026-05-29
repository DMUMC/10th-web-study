import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import cartItems from '../constants/cartItems'
import type { CartItem } from '../types/cartItem'
import { calcTotal } from '../utils/formatPrice'

export interface CartState {
  cartItems: CartItem[]
  cart: CartItem[]
}

const initialState: CartState = {
  cartItems: cartItems.map((item) => ({ ...item })),
  cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    changePurchaseAmount: (
      state,
      action: PayloadAction<{ id: string; delta: number }>,
    ) => {
      const item = state.cartItems.find((i) => i.id === action.payload.id)
      if (item) {
        item.amount = Math.max(1, item.amount + action.payload.delta)
      }
    },
    addToCart: (
      state,
      action: PayloadAction<{ item: CartItem; amount: number }>,
    ) => {
      const { item, amount } = action.payload
      if (amount < 1) return

      const existing = state.cart.find((i) => i.id === item.id)
      if (existing) {
        existing.amount += amount
      } else {
        state.cart.push({ ...item, amount })
      }
    },
    changeCartAmount: (
      state,
      action: PayloadAction<{ id: string; delta: number }>,
    ) => {
      const item = state.cart.find((i) => i.id === action.payload.id)
      if (!item) return

      item.amount = Math.max(0, item.amount + action.payload.delta)
      if (item.amount === 0) {
        state.cart = state.cart.filter((i) => i.id !== action.payload.id)
      }
    },
    clearCart: (state) => {
      state.cart = []
    },
  },
})

export const {
  changePurchaseAmount,
  addToCart,
  changeCartAmount,
  clearCart,
} = cartSlice.actions

export const selectCartItems = (state: { cart: CartState }) => state.cart.cartItems
export const selectCart = (state: { cart: CartState }) => state.cart.cart
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.cart.reduce((sum, item) => sum + item.amount, 0)
export const selectCartTotalPrice = (state: { cart: CartState }) =>
  calcTotal(state.cart.cart)
export const selectPurchaseTotalQuantity = (state: { cart: CartState }) =>
  state.cart.cartItems.reduce((sum, item) => sum + item.amount, 0)
export const selectPurchaseTotalPrice = (state: { cart: CartState }) =>
  calcTotal(state.cart.cartItems)
export const selectCartTotalQuantity = selectCartCount

export default cartSlice.reducer

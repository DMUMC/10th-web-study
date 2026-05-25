import { create } from 'zustand';
import {type  ICartItem } from '../../constants/cartItems';
import cartItems from '../../constants/cartItems';


interface CartState {
  cartItems: ICartItem[];
  amount: number;
  total: number;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: cartItems,
  amount: 0,
  total: 0,

  increase: (id) => 
    set((state) => ({
      cartItems: state.cartItems.map((item) => 
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      ),
    })),

  decrease: (id) => 
    set((state) => ({
      cartItems: state.cartItems.map((item) => 
        item.id === id ? { ...item, amount: item.amount - 1 } : item
      ).filter((item) => item.amount > 0), // 0이 되면 삭제
    })),

  removeItem: (id) => 
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cartItems: [], amount: 0, total: 0 }),

  calculateTotals: () => 
    set((state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * Number(item.price);
      });
      return { amount, total };
    }),
}));
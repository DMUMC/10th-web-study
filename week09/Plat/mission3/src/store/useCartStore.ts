import { create } from 'zustand';
import cartItems from '../constants/cartItems';

export type CartItem = {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
};

type CartTotals = {
  amount: number;
  total: number;
};

type CartStore = {
  cartItems: CartItem[];
  amount: number;
  total: number;
  isOpen: boolean;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  openModal: () => void;
  closeModal: () => void;
  confirmClearCart: () => void;
};

const calculateCartTotals = (items: CartItem[]): CartTotals =>
  items.reduce(
    (totals, item) => {
      totals.amount += item.amount;
      totals.total += Number(item.price) * item.amount;
      return totals;
    },
    { amount: 0, total: 0 },
  );

const initialTotals = calculateCartTotals(cartItems);

const useCartStore = create<CartStore>((set, get) => ({
  cartItems,
  amount: initialTotals.amount,
  total: initialTotals.total,
  isOpen: false,
  increase: (id) =>
    set((state) => {
      const updatedItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item,
      );

      return {
        cartItems: updatedItems,
        ...calculateCartTotals(updatedItems),
      };
    }),
  decrease: (id) =>
    set((state) => {
      const updatedItems = state.cartItems
        .map((item) => (item.id === id ? { ...item, amount: item.amount - 1 } : item))
        .filter((item) => item.amount > 0);

      return {
        cartItems: updatedItems,
        ...calculateCartTotals(updatedItems),
      };
    }),
  removeItem: (id) =>
    set((state) => {
      const updatedItems = state.cartItems.filter((item) => item.id !== id);

      return {
        cartItems: updatedItems,
        ...calculateCartTotals(updatedItems),
      };
    }),
  clearCart: () =>
    set(() => ({
      cartItems: [],
      amount: 0,
      total: 0,
    })),
  calculateTotals: () =>
    set((state) => ({
      ...calculateCartTotals(state.cartItems),
    })),
  openModal: () =>
    set(() => ({
      isOpen: true,
    })),
  closeModal: () =>
    set(() => ({
      isOpen: false,
    })),
  confirmClearCart: () => {
    get().clearCart();
    get().closeModal();
  },
}));

export default useCartStore;

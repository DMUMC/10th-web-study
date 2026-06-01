import { create } from 'zustand'
import { useCartStore } from './cartStore'

export interface ModalState {
  isOpen: boolean
}

export interface ModalActions {
  open: () => void
  close: () => void
  confirmClearCart: () => void
}

export type ModalStore = ModalState & ModalActions

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,

  open: () => set({ isOpen: true }),

  close: () => set({ isOpen: false }),

  confirmClearCart: () => {
    useCartStore.getState().clearCart()
    set({ isOpen: false })
  },
}))

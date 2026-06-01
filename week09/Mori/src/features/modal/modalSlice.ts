import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

export interface ModalState {
  isOpen: boolean
}

const initialState: ModalState = {
  isOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true
    },
    closeModal: (state) => {
      state.isOpen = false
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export const selectIsModalOpen = (state: RootState) => state.modal.isOpen

export default modalSlice.reducer

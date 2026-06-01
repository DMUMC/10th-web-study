import {
  calculateTotals,
  clearCart,
} from '../features/cart/cartSlice'
import { closeModal, selectIsModalOpen } from '../features/modal/modalSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export default function Modal() {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectIsModalOpen)

  if (!isOpen) return null

  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleConfirm = () => {
    dispatch(clearCart())
    dispatch(calculateTotals())
    dispatch(closeModal())
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h2
          id="modal-title"
          className="text-lg font-bold text-stone-900"
        >
          장바구니 비우기
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          장바구니의 모든 음반을 삭제하시겠습니까?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            아니요
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            네
          </button>
        </div>
      </div>
    </div>
  )
}

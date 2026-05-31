import useCartStore from '../store/useCartStore'
import useModalStore from '../store/useModalStore'

function Modal() {
  const { clearCart } = useCartStore()
  const { closeModal } = useModalStore()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-6 shadow-xl">
        <p className="text-lg font-semibold">정말 삭제하시겠습니까?</p>
        <div className="flex gap-4">
          <button
            onClick={() => closeModal()}
            className="px-6 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
          >
            아니요
          </button>
          <button
            onClick={() => {
              clearCart()
              closeModal()
            }}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            네
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
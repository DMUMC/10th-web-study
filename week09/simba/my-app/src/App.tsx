import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from './store'
import { openModal, closeModal } from './store/features/modal/modalSlice'
import { clearCart, calculateTotals } from './store/features/cart/cartSlice'
import { useEffect } from 'react'
import CartItem from './components/CartItem'
import Navbar from './components/Navbar'
import Modal from './components/Modal'

function App() {
  const { cartItems, total } = useSelector((state: RootState) => state.cart)
  const { isOpen } = useSelector((state: RootState) => state.modal)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  return (
    <div className="min-h-screen bg-gray-100">
      {isOpen && <Modal />}
      <Navbar />

      <main className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        <div className="mt-4 text-right text-gray-700 font-semibold">
          총 금액: ${total.toLocaleString()}
        </div>

        <button
          onClick={() => dispatch(openModal())}
          className="mt-4 w-full py-3 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-200 transition"
        >
          전체 삭제
        </button>
      </main>
    </div>
  )
}

export default App
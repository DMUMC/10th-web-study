import { useEffect } from 'react'
import CartItem from './components/CartItem'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import useCartStore from './store/useCartStore'
import useModalStore from './store/useModalStore'

function App() {
  const { cartItems, total, calculateTotals } = useCartStore()
  const { isOpen, openModal } = useModalStore()

useEffect(() => {
  calculateTotals()
}, [cartItems, calculateTotals])  // ← calculateTotals 추가

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
          onClick={() => openModal()}
          className="mt-4 w-full py-3 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-200 transition"
        >
          전체 삭제
        </button>
      </main>
    </div>
  )
}

export default App
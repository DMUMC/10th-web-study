import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from './store'
import { clearCart, calculateTotals } from './store/cartSlice'
import { useEffect } from 'react'
import CartItem from './components/CartItem'
import Navbar from './components/Navbar'

function App() {
  const { cartItems, total } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  // cartItems가 바뀔 때마다 자동으로 calculateTotals 호출
  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  return (
    <div className="min-h-screen bg-gray-100">
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
          onClick={() => dispatch(clearCart())}
          className="mt-4 w-full py-3 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-200 transition"
        >
          전체 삭제
        </button>
      </main>
    </div>
  )
}

export default App
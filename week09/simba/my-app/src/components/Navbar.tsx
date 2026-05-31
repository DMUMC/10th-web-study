import { useSelector } from 'react-redux'
import type { RootState } from '../store'

function Navbar() {
  const { amount } = useSelector((state: RootState) => state.cart)

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Ohtani Ahn</h1>
      <div className="flex items-center gap-2">
        <span>🛒</span>
        <span className="font-bold">{amount}</span>
      </div>
    </nav>
  )
}

export default Navbar
import { useDispatch } from 'react-redux'
import { increase, decrease, removeItem } from '../store/cartSlice'

interface Props {
  id: string
  title: string
  singer: string
  price: string
  img: string
  amount: number
}

function CartItem({ id, title, singer, price, img, amount }: Props) {
  const dispatch = useDispatch()

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 last:border-none">
      <img src={img} alt={title} className="w-16 h-16 object-cover rounded" />

      <div className="flex-1 ml-4">
        <p className="font-bold text-sm">{title}</p>
        <p className="text-gray-500 text-sm">{singer}</p>
        <p className="text-gray-800 text-sm font-semibold">${price}</p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(decrease(id))}
            className="w-7 h-7 border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
          >
            -
          </button>
          <span className="w-6 text-center">{amount}</span>
          <button
            onClick={() => dispatch(increase(id))}
            className="w-7 h-7 border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        <button
          onClick={() => dispatch(removeItem(id))}
          className="text-xs text-red-400 hover:text-red-600"
        >
          삭제
        </button>
      </div>
    </div>
  )
}

export default CartItem
import { Link } from 'react-router-dom'
import QuantityControl from '../components/QuantityControl'
import {
  changeCartAmount,
  clearCart,
  selectCart,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from '../store/cartSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { formatPrice } from '../utils/formatPrice'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(selectCart)
  const totalQuantity = useAppSelector(selectCartTotalQuantity)
  const cartTotal = useAppSelector(selectCartTotalPrice)

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 text-center">
        <p className="text-lg font-medium text-stone-600">
          장바구니가 비어 있습니다.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          구매 목록으로 가기
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">장바구니</h1>
          <p className="mt-1 text-sm text-stone-500">
            담은 앨범의 수량을 조절할 수 있습니다.
          </p>
        </div>
        <button
          type="button"
          onClick={() => dispatch(clearCart())}
          className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          장바구니 비우기
        </button>
      </div>

      <ul className="space-y-4">
        {cart.map((item) => {
          const lineTotal = Number(item.price) * item.amount

          return (
            <li
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <img
                src={item.img}
                alt={`${item.title} 앨범 커버`}
                className="h-24 w-24 shrink-0 rounded-xl object-cover"
              />

              <div className="min-w-0 flex-1">
                <h2 className="truncate font-semibold text-stone-900">
                  {item.title}
                </h2>
                <p className="mt-0.5 truncate text-sm text-stone-500">
                  {item.singer}
                </p>
                <p className="mt-2 text-sm font-medium text-emerald-700">
                  {formatPrice(item.price)}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-col sm:items-end">
                <QuantityControl
                  amount={item.amount}
                  onDecrease={() =>
                    dispatch(changeCartAmount({ id: item.id, delta: -1 }))
                  }
                  onIncrease={() =>
                    dispatch(changeCartAmount({ id: item.id, delta: 1 }))
                  }
                  min={0}
                />
                <span className="text-sm font-semibold text-stone-700">
                  {formatPrice(lineTotal)}
                </span>
              </div>
            </li>
          )
        })}
      </ul>

      <footer className="mt-8 flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
          <span className="text-base font-medium text-stone-700">
            총 수량{' '}
            <span className="font-bold text-emerald-800">{totalQuantity}개</span>
          </span>
          <span className="text-base font-medium text-stone-700">
            총 금액{' '}
            <span className="text-xl font-bold text-emerald-800">
              {formatPrice(cartTotal)}
            </span>
          </span>
        </div>
      </footer>
    </main>
  )
}

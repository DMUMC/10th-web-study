import { selectAmount } from '../store/cartSlice'
import { useAppSelector } from '../store/hooks'

export default function Header() {
  const amount = useAppSelector(selectAmount)

  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <span className="text-xl font-bold tracking-tight text-emerald-700">
          Mori Music
        </span>
        {amount > 0 && (
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
            장바구니 {amount}개
          </span>
        )}
      </div>
    </header>
  )
}

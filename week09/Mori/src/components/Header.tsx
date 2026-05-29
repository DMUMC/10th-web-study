import { NavLink } from 'react-router-dom'
import { selectCartCount } from '../store/cartSlice'
import { useAppSelector } from '../store/hooks'

export default function Header() {
  const cartCount = useAppSelector(selectCartCount)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-emerald-600 text-white'
        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
    }`

  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-emerald-700">
            Mori Music
          </span>
        </NavLink>

        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={linkClass}>
            구매 목록
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            {({ isActive }) => (
              <span className="flex items-center gap-2">
                장바구니
                {cartCount > 0 && (
                  <span
                    className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-bold ${
                      isActive
                        ? 'bg-white text-emerald-600'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

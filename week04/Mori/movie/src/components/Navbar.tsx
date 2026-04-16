import { NavLink } from 'react-router-dom'

const base =
  'px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-transparent'

export default function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-2 flex-wrap">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${base} ${
              isActive
                ? 'bg-white/10 text-white border-white/10'
                : 'text-zinc-300 hover:text-white hover:bg-white/5'
            }`
          }
          end
        >
          홈
        </NavLink>
        <NavLink
          to="/popular"
          className={({ isActive }) =>
            `${base} ${
              isActive
                ? 'bg-white/10 text-white border-white/10'
                : 'text-zinc-300 hover:text-white hover:bg-white/5'
            }`
          }
        >
          인기 영화
        </NavLink>
        <NavLink
          to="/upcoming"
          className={({ isActive }) =>
            `${base} ${
              isActive
                ? 'bg-white/10 text-white border-white/10'
                : 'text-zinc-300 hover:text-white hover:bg-white/5'
            }`
          }
        >
          개봉 예정
        </NavLink>
        <NavLink
          to="/top-rated"
          className={({ isActive }) =>
            `${base} ${
              isActive
                ? 'bg-white/10 text-white border-white/10'
                : 'text-zinc-300 hover:text-white hover:bg-white/5'
            }`
          }
        >
          평점 높은
        </NavLink>
        <NavLink
          to="/now-playing"
          className={({ isActive }) =>
            `${base} ${
              isActive
                ? 'bg-white/10 text-white border-white/10'
                : 'text-zinc-300 hover:text-white hover:bg-white/5'
            }`
          }
        >
          상영 중
        </NavLink>
      </div>
    </nav>
  )
}


import { CircleUserRound, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSearchFilter } from '../hooks/useSearchFilter'

type AppSidebarProps = {
  open: boolean
  onClose: () => void
}

const HEADER_LEAVE_TOP = 'top-14'

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  const { focusHeaderSearch } = useSearchFilter()

  function handleSearchClick() {
    onClose()
    queueMicrotask(() => focusHeaderSearch())
  }

  return (
    <div
      className={
        open
          ? 'pointer-events-auto fixed inset-0 z-40'
          : 'pointer-events-none invisible fixed inset-0 z-40'
      }
      aria-hidden={!open}
    >
      <div
        role="presentation"
        className={
          `${HEADER_LEAVE_TOP} absolute inset-x-0 bottom-0 cursor-default bg-black/60 transition-opacity ` +
          (open ? 'opacity-100' : 'opacity-0')
        }
        onClick={onClose}
      />
      <aside
        id="app-sidebar-panel"
        className={
          `${HEADER_LEAVE_TOP} absolute bottom-0 left-0 flex w-72 max-w-[min(85vw,18rem)] flex-col gap-1 border-r border-white/10 bg-zinc-900 px-4 pb-8 pt-6 shadow-xl transition-transform duration-200 ease-out ` +
          (open ? 'translate-x-0' : '-translate-x-full')
        }
      >
        <p className="mb-2 border-b border-white/10 pb-3 text-xs font-semibold uppercase tracking-wide text-white/50">
          메뉴
        </p>
        <button
          type="button"
          onClick={() => handleSearchClick()}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white transition hover:bg-white/10"
        >
          <Search className="h-5 w-5 shrink-0 text-main-pink" aria-hidden />
          검색
        </button>
        <Link
          to="/my"
          onClick={onClose}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white transition hover:bg-white/10"
        >
          <CircleUserRound className="h-5 w-5 shrink-0 text-main-pink" aria-hidden />
          마이페이지
        </Link>
      </aside>
    </div>
  )
}

import { Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useSearchFilter } from '../hooks/useSearchFilter'
import { useAuth } from '../hooks/useAuth'
import { useLogoutMutation } from '../queries/authMutations'
import { HamburgerIcon } from './icons/HamburgerIcon'

type HeaderProps = {
  onSignupClick?: () => void
  menuOpen?: boolean
  onMenuToggle?: () => void
}

export function Header({ onSignupClick, menuOpen, onMenuToggle }: HeaderProps) {
  const navigate = useNavigate()
  const { user, ready, isAuthenticated } = useAuth()
  const { searchQuery, setSearchQuery, searchInputRef } = useSearchFilter()
  const logoutMutation = useLogoutMutation()

  function handleSignup() {
    if (onSignupClick) onSignupClick()
    else navigate('/signup')
  }

  function handleLogout() {
    logoutMutation.mutate()
  }

  return (
    <header className="relative z-50 flex w-full shrink-0 items-center gap-2 bg-zinc-900 px-3 py-3 md:gap-4 md:px-8">
      <div className="flex min-w-0 shrink-0 items-center gap-2 md:gap-3">
        {onMenuToggle ? (
          <button
            type="button"
            onClick={() => onMenuToggle()}
            aria-expanded={Boolean(menuOpen)}
            aria-controls="app-sidebar-panel"
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            className="inline-flex shrink-0 items-center justify-center rounded-md text-white outline-none ring-main-pink/40 transition hover:bg-white/10 focus-visible:ring-2"
          >
            <HamburgerIcon className="h-8 w-8 md:h-9 md:w-9" />
          </button>
        ) : null}
        <Link
          to="/"
          className="min-w-0 max-w-27 truncate text-base font-bold tracking-tight text-main-pink sm:max-w-none md:text-xl"
        >
          돌려돌려LP판
        </Link>
      </div>

      <div className="min-w-0 flex-1">
        <label
          htmlFor="header-lp-search"
          className="flex max-w-xl items-center gap-2 rounded-lg border border-white/15 bg-black/35 px-2.5 py-1 shadow-inner outline-none ring-main-pink/30 focus-within:ring-2 md:gap-3 md:px-3 md:py-1.5"
        >
          <Search
            className="h-4.5 w-4.5 shrink-0 text-white/45 md:h-5 md:w-5"
            aria-hidden
          />
          <input
            ref={searchInputRef}
            id="header-lp-search"
            type="search"
            value={searchQuery}
            enterKeyHint="search"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색…"
            className="min-w-0 flex-1 bg-transparent text-xs text-white placeholder:text-white/40 outline-none md:text-sm"
            autoComplete="off"
            aria-label="LP 검색"
          />
        </label>
      </div>

      <div className="flex shrink-0 justify-end md:min-w-40">
        {!ready ? (
          <div className="h-8 w-16 animate-pulse rounded bg-zinc-800 md:w-24" aria-hidden />
        ) : isAuthenticated ? (
          <div className="flex max-w-[min(100%,14rem)] items-center gap-1.5 md:max-w-[min(100%,18rem)] md:gap-3">
            <span className="hidden truncate text-sm text-zinc-300 sm:inline md:text-base">
              {user?.name}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="shrink-0 rounded-md border border-zinc-600 px-2 py-1 text-xs font-normal text-white transition hover:bg-zinc-800 disabled:opacity-50 md:px-3 md:text-sm"
            >
              {logoutMutation.isPending ? '…' : '로그아웃'}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1 md:gap-3">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="px-2 py-1 text-xs font-normal text-white transition hover:text-zinc-300 md:px-3 md:text-sm"
            >
              로그인
            </button>
            <button
              type="button"
              onClick={handleSignup}
              className="rounded-md bg-main-pink px-2 py-1 text-xs font-normal text-white transition hover:opacity-90 md:px-3 md:text-sm"
            >
              회원가입
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

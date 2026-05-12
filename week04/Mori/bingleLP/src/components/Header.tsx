import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

type HeaderProps = {
  onSignupClick?: () => void
}

export function Header({ onSignupClick }: HeaderProps) {
  const navigate = useNavigate()
  const { user, ready, isAuthenticated, logout } = useAuth()
  const [logoutPending, setLogoutPending] = useState(false)

  function handleSignup() {
    if (onSignupClick) onSignupClick()
    else navigate('/signup')
  }

  async function handleLogout() {
    setLogoutPending(true)
    try {
      await logout()
      navigate('/')
    } finally {
      setLogoutPending(false)
    }
  }

  return (
    <header className="flex w-full shrink-0 items-center justify-between bg-zinc-900 px-4 py-3 md:px-8">
      <Link
        to="/"
        className="text-lg font-bold tracking-tight text-main-pink md:text-xl"
      >
        돌려돌려LP판
      </Link>
      {!ready ? (
        <div className="h-8 w-24 animate-pulse rounded bg-zinc-800" aria-hidden />
      ) : isAuthenticated ? (
        <div className="flex max-w-[min(100%,18rem)] items-center gap-2 md:gap-3">
          <span className="truncate text-sm text-zinc-300 md:text-base">
            {user?.name}
          </span>
          <button
            type="button"
            onClick={() => void handleLogout()}
            disabled={logoutPending}
            className="shrink-0 rounded-md border border-zinc-600 px-3 py-1 text-sm font-normal text-white transition hover:bg-zinc-800 disabled:opacity-50"
          >
            {logoutPending ? '…' : '로그아웃'}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="px-3 py-1 text-sm font-normal text-white transition hover:text-zinc-300"
          >
            로그인
          </button>
          <button
            type="button"
            onClick={handleSignup}
            className="rounded-md bg-main-pink px-3 py-1 text-sm font-normal text-white transition hover:opacity-90"
          >
            회원가입
          </button>
        </div>
      )}
    </header>
  )
}

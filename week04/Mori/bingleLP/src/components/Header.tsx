import { Link, useNavigate } from 'react-router-dom'

type HeaderProps = {
  onSignupClick?: () => void
}

export function Header({ onSignupClick }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="flex w-full shrink-0 items-center justify-between bg-zinc-900 px-4 py-3 md:px-8">
      <Link
        to="/"
        className="text-lg font-bold tracking-tight text-main-pink md:text-xl"
      >
        돌려돌려LP판
      </Link>
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
          onClick={onSignupClick}
          className="rounded-md bg-main-pink px-3 py-1 text-sm font-normal text-white transition hover:opacity-90"
        >
          회원가입
        </button>
      </div>
    </header>
  )
}

import { Link } from 'react-router-dom'

export function NewLpFloatingButton() {
  return (
    <Link
      to="/lps/new"
      aria-label="새 글 쓰기"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-semibold leading-none text-black shadow-lg ring-1 ring-white/15 transition hover:bg-white/95 active:scale-[0.98]"
    >
      +
    </Link>
  )
}

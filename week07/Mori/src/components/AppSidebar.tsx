import { useState } from 'react'
import { CircleUserRound, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ConfirmModal } from './common/ConfirmModal'
import { useAuth } from '../hooks/useAuth'
import { useSearchFilter } from '../hooks/useSearchFilter'
import { useDeleteAccountMutation } from '../queries/authMutations'

type AppSidebarProps = {
  open: boolean
  onClose: () => void
}

const HEADER_LEAVE_TOP = 'top-14'

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  const { isAuthenticated, ready } = useAuth()
  const { focusHeaderSearch } = useSearchFilter()
  const deleteAccountMutation = useDeleteAccountMutation()
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [withdrawError, setWithdrawError] = useState<string | null>(null)

  function handleSearchClick() {
    onClose()
    queueMicrotask(() => focusHeaderSearch())
  }

  function handleWithdrawConfirm() {
    setWithdrawError(null)
    deleteAccountMutation.mutate(undefined, {
      onError: (err) => {
        setWithdrawError(
          err instanceof Error ? err.message : '회원 탈퇴에 실패했습니다.',
        )
      },
    })
  }

  return (
    <>
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
            `${HEADER_LEAVE_TOP} absolute bottom-0 left-0 flex h-[calc(100dvh-3.5rem)] w-72 max-w-[min(85vw,18rem)] flex-col border-r border-white/10 bg-zinc-900 px-4 pb-8 pt-6 shadow-xl transition-transform duration-200 ease-out ` +
            (open ? 'translate-x-0' : '-translate-x-full')
          }
        >
          <p className="mb-2 border-b border-white/10 pb-3 text-xs font-semibold uppercase tracking-wide text-white/50">
            메뉴
          </p>
          <div className="flex flex-col gap-1">
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
          </div>

          {ready && isAuthenticated ? (
            <div className="mt-auto border-t border-white/10 pt-4">
              {withdrawError ? (
                <p role="alert" className="mb-2 text-xs text-red-400">
                  {withdrawError}
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  setWithdrawError(null)
                  setWithdrawOpen(true)
                }}
                className="flex w-full items-center justify-center rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-400/15"
              >
                탈퇴하기
              </button>
            </div>
          ) : null}
        </aside>
      </div>

      <ConfirmModal
        open={withdrawOpen}
        title="회원 탈퇴"
        description="정말 탈퇴하시겠습니까? 탈퇴 후에는 계정을 복구할 수 없습니다."
        confirmLabel="예"
        cancelLabel="아니오"
        pending={deleteAccountMutation.isPending}
        onConfirm={handleWithdrawConfirm}
        onCancel={() => {
          if (deleteAccountMutation.isPending) return
          setWithdrawOpen(false)
        }}
      />
    </>
  )
}

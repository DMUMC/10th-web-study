import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { LpCreateModal } from './LpCreateModal'

export function NewLpFloatingButton() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)

  function handleClick() {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    setModalOpen(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="새 글 쓰기"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-main-pink text-2xl font-semibold leading-none text-white shadow-lg shadow-main-pink/30 transition hover:brightness-110 active:scale-[0.98]"
      >
        +
      </button>
      <LpCreateModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

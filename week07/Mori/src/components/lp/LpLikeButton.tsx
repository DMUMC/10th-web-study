import { Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useLpDetailQuery } from '../../queries/lpDetail'
import { useToggleLpLikeMutation } from '../../queries/lpLikeMutations'

type LpLikeButtonProps = {
  lpId: number
}

export function LpLikeButton({ lpId }: LpLikeButtonProps) {
  const navigate = useNavigate()
  const { user, ready, isAuthenticated } = useAuth()
  const { data } = useLpDetailQuery(lpId)
  const likeMutation = useToggleLpLikeMutation(lpId)

  const lp = data?.data
  if (!lp) return null

  const isLiked =
    ready && user !== null && lp.likes.some((like) => like.userId === user.id)
  const likeCount = lp.likes.length

  function handleClick() {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    likeMutation.mutate({ action: isLiked ? 'unlike' : 'like' })
  }

  return (
    <div className="ml-auto flex items-center gap-2">
      <span className="text-xs text-white/50">좋아요 {likeCount}</span>
      <button
        type="button"
        onClick={handleClick}
        disabled={likeMutation.isPending}
        aria-pressed={isLiked}
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition disabled:opacity-60 ${
          isLiked
            ? 'border-main-pink/40 bg-main-pink/15 text-white'
            : 'border-white/15 bg-white/5 text-white hover:bg-white/10'
        }`}
      >
        <Heart
          className={`h-4 w-4 ${isLiked ? 'fill-main-pink text-main-pink' : 'text-main-pink'}`}
          aria-hidden
        />
        {isLiked ? '좋아요 취소' : '좋아요'}
      </button>
    </div>
  )
}

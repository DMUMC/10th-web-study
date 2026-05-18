import { Loader2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { QueryErrorCard } from '../query/QueryStates'
import { LpCommentItem } from './LpCommentItem'
import { LpCommentsSkeleton } from './LpCommentsSkeleton'
import { useAuth } from '../../hooks/useAuth'
import { useCreateCommentMutation } from '../../queries/lpCommentMutations'
import {
  useLpCommentsInfiniteQuery,
  type LpCommentsOrder,
} from '../../queries/lpComments'

function formatDateTime(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function LpCommentsSection(props: { lpId: number }) {
  const { user } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [commentDraft, setCommentDraft] = useState('')
  const [createError, setCreateError] = useState<string | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const createCommentMutation = useCreateCommentMutation(props.lpId)

  const orderParam = searchParams.get('order')
  const order: LpCommentsOrder =
    orderParam === 'asc' || orderParam === 'desc' ? orderParam : 'desc'

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLpCommentsInfiniteQuery(props.lpId, order)

  const comments = useMemo(
    () => data?.pages.flatMap((p) => p.data.data) ?? [],
    [data],
  )

  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (!first?.isIntersecting) return
        if (!hasNextPage) return
        if (isFetchingNextPage) return
        void fetchNextPage()
      },
      { root: null, rootMargin: '300px', threshold: 0 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isPending])

  function handleCreateComment() {
    const content = commentDraft.trim()
    if (!content) return

    setCreateError(null)
    createCommentMutation.mutate(content, {
      onSuccess: () => setCommentDraft(''),
      onError: (err) => {
        setCreateError(
          err instanceof Error ? err.message : '댓글 등록에 실패했습니다.',
        )
      },
    })
  }

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-semibold tracking-tight">댓글</h2>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-white/45">
            정렬
          </span>
          <div className="relative inline-flex min-h-9 rounded-lg border border-white/15 bg-white/5 p-[5px]">
            <span
              aria-hidden
              className="pointer-events-none absolute top-[5px] bottom-[5px] w-[calc(50%-7px)] rounded-md bg-main-pink shadow-inner transition-[left] duration-300 ease-out motion-reduce:transition-none"
              style={{
                left: order === 'desc' ? '5px' : 'calc(50% + 2px)',
              }}
            />
            <button
              type="button"
              aria-pressed={order === 'desc'}
              onClick={() => setSearchParams({ order: 'desc' })}
              className={`relative z-10 min-w-[4.85rem] rounded-md px-3 py-1.5 text-xs font-medium outline-none ring-main-pink/40 transition-colors focus-visible:ring-2 motion-reduce:transition-none ${
                order === 'desc' ? 'text-white' : 'text-white/65 hover:text-white/95'
              }`}
            >
              최신순
            </button>
            <button
              type="button"
              aria-pressed={order === 'asc'}
              onClick={() => setSearchParams({ order: 'asc' })}
              className={`relative z-10 min-w-[4.85rem] rounded-md px-3 py-1.5 text-xs font-medium outline-none ring-main-pink/40 transition-colors focus-visible:ring-2 motion-reduce:transition-none ${
                order === 'asc' ? 'text-white' : 'text-white/65 hover:text-white/95'
              }`}
            >
              오래된 순
            </button>
          </div>
          {isFetchingNextPage ? (
            <Loader2
              className="h-4 w-4 shrink-0 animate-spin text-main-pink"
              aria-hidden
            />
          ) : null}
        </div>
      </header>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 shrink-0 rounded-full bg-white/10" aria-hidden />
          <div className="min-w-0 flex-1">
            <label
              htmlFor="comment-draft"
              className="text-xs font-medium text-white/60"
            >
              댓글 작성
            </label>
            <textarea
              id="comment-draft"
              value={commentDraft}
              onChange={(e) => setCommentDraft(e.target.value)}
              placeholder="댓글을 입력하세요..."
              rows={3}
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none ring-main-pink/30 placeholder:text-white/35 focus:ring-2"
            />
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <p className="text-xs text-white/50 sm:flex-1">
                {createError ? (
                  <span role="alert" className="text-red-400">
                    {createError}
                  </span>
                ) : commentDraft.trim().length === 0 ? (
                  '댓글은 1자 이상 입력해야 합니다.'
                ) : (
                  ' '
                )}
              </p>
              <button
                type="button"
                onClick={handleCreateComment}
                disabled={
                  commentDraft.trim().length === 0 || createCommentMutation.isPending
                }
                className="ml-auto inline-flex items-center justify-center gap-2 rounded-lg bg-main-pink px-4 py-2 text-sm font-semibold text-white transition enabled:hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {createCommentMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : null}
                등록
              </button>
            </div>
          </div>
        </div>
      </div>

      {isError ? (
        <QueryErrorCard
          message={
            error instanceof Error
              ? error.message
              : '댓글을 불러오기에 실패했습니다.'
          }
          onRetry={() => void refetch()}
        />
      ) : isPending ? (
        <LpCommentsSkeleton />
      ) : comments.length === 0 ? (
        <p className="text-sm text-white/60">첫 댓글을 남겨보세요.</p>
      ) : (
        <>
          <ul className="mx-auto flex w-full max-w-5xl flex-col gap-3">
            {comments.map((c) => (
              <LpCommentItem
                key={c.id}
                comment={c}
                lpId={props.lpId}
                isOwner={user?.id === c.authorId}
                formatDateTime={formatDateTime}
              />
            ))}
          </ul>

          {isFetchingNextPage ? <LpCommentsSkeleton /> : null}
          <div ref={sentinelRef} className="h-6 w-full" />
        </>
      )}
    </section>
  )
}


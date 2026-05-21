import { Heart, Pencil, Trash2 } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LpCommentsSection } from '../components/lp/LpCommentsSection'
import { QueryErrorCard } from '../components/query/QueryStates'
import { LpDetailSkeleton } from '../components/lp/LpDetailSkeleton'
import { useAuth } from '../hooks/useAuth'
import { useLpDetailQuery } from '../queries/lpDetail'

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

export function LpDetailPage() {
  const navigate = useNavigate()
  const { lpid } = useParams()
  const { user, ready } = useAuth()

  const lpId = useMemo(() => {
    const n = Number(lpid)
    return Number.isFinite(n) ? n : null
  }, [lpid])

  const { data, isPending, isError, error, refetch } = useLpDetailQuery(lpId)

  if (isPending) {
    return <LpDetailSkeleton />
  }

  if (isError) {
    return (
      <main className="flex min-h-0 flex-1 flex-col bg-black">
        <QueryErrorCard
          message={error instanceof Error ? error.message : '불러오기에 실패했습니다.'}
          onRetry={() => void refetch()}
          onBack={() => navigate(-1)}
        />
      </main>
    )
  }

  const lp = data?.data
  if (!lp) {
    return (
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-12 text-white">
        <p className="text-sm text-white/70">데이터가 없습니다.</p>
      </main>
    )
  }

  const isMine = ready && user?.id === lp.authorId

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-10 text-white">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-white/45">
            {lp.author?.name ?? '작성자'} · {formatDateTime(lp.createdAt)}
          </p>
          <h1 className="mt-1 line-clamp-2 text-2xl font-bold tracking-tight md:text-3xl">
            {lp.title}
          </h1>
        </div>

        {isMine ? (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
            >
              <Pencil className="h-4 w-4" aria-hidden />
              수정
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-red-400/25 bg-red-400/10 px-3 py-2 text-sm text-red-100 transition hover:bg-red-400/15"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
              삭제
            </button>
          </div>
        ) : null}
      </header>

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="aspect-video w-full bg-white/5">
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-4 p-5 sm:p-6">
          <p className="whitespace-pre-wrap text-sm leading-6 text-white/80">
            {lp.content}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {lp.tags?.map((t) => (
              <span
                key={t.id}
                className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
              >
                #{t.name}
              </span>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-white/50">좋아요 {lp.likes?.length ?? 0}</span>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white transition hover:bg-white/10"
                title="좋아요 기능은 준비 중입니다."
              >
                <Heart className="h-4 w-4 text-main-pink" aria-hidden />
                좋아요
              </button>
            </div>
          </div>
        </div>
      </section>

      {lpId !== null ? <LpCommentsSection lpId={lpId} /> : null}
    </main>
  )
}


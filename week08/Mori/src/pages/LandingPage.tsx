import { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'
import type { LpItem } from '../api/types'
import { NewLpFloatingButton } from '../components/lp/NewLpFloatingButton'
import { LpList } from '../components/lp/LpList'
import { LpListSkeleton } from '../components/lp/LpListSkeleton'
import { QueryErrorCard } from '../components/query/QueryStates'
import { useDebounce } from '../hooks/useDebounce'
import { useThrottle } from '../hooks/useThrottle'
import { useSearchFilter } from '../hooks/useSearchFilter'
import { useLpsInfiniteQuery, type LpListSort } from '../queries/lps'

const LOAD_MORE_THROTTLE_MS = 1000

export function LandingPage() {
  const { searchQuery } = useSearchFilter()
  const debouncedQuery = useDebounce(searchQuery, 300)
  const trimmedQuery = debouncedQuery.trim()
  const isWhitespaceOnly = debouncedQuery.length > 0 && trimmedQuery.length === 0

  const [sort, setSort] = useState<LpListSort>('desc')
  const [sentinelInView, setSentinelInView] = useState(false)
  const throttledSentinelInView = useThrottle(sentinelInView, LOAD_MORE_THROTTLE_MS)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const wasIntersectingRef = useRef(false)

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLpsInfiniteQuery(sort, debouncedQuery, !isWhitespaceOnly)

  const items: LpItem[] = data?.pages.flatMap((page) => page.data.data) ?? []
  const isLoading = isPending

  function toggleSort(next: LpListSort) {
    setSort(next)
  }

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || isLoading) return

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries[0]?.isIntersecting ?? false

        if (!intersecting) {
          wasIntersectingRef.current = false
          setSentinelInView(false)
          return
        }

        // sentinel이 화면에 새로 들어올 때만 로드 트리거 (계속 보이는 동안 반복 X)
        if (wasIntersectingRef.current) return
        wasIntersectingRef.current = true
        setSentinelInView(true)
      },
      { root: null, rootMargin: '300px', threshold: 0 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [isLoading])

  useEffect(() => {
    if (!throttledSentinelInView) return
    if (!hasNextPage || isFetchingNextPage) return

    void fetchNextPage()
    setSentinelInView(false)
  }, [throttledSentinelInView, fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <main className="relative flex min-h-0 flex-1 flex-col items-center gap-6 bg-black px-4 py-12">
      <header className="mx-auto flex w-full max-w-5xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-2xl font-bold text-white md:text-3xl">돌려돌려LP판</p>
          <p className="mt-1 text-sm text-white/60">최신 LP 목록을 불러옵니다.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-white/45">
            정렬
          </span>
          <div className="relative inline-flex min-h-9 rounded-lg border border-white/15 bg-white/5 p-[5px]">
            <span
              aria-hidden
              className="pointer-events-none absolute top-[5px] bottom-[5px] w-[calc(50%-7px)] rounded-md bg-main-pink shadow-inner transition-[left] duration-300 ease-out motion-reduce:transition-none"
              style={{
                left: sort === 'desc' ? '5px' : 'calc(50% + 2px)',
              }}
            />
            <button
              type="button"
              aria-pressed={sort === 'desc'}
              onClick={() => toggleSort('desc')}
              className={`relative z-10 min-w-[4.85rem] rounded-md px-3 py-1.5 text-xs font-medium outline-none ring-main-pink/40 transition-colors focus-visible:ring-2 motion-reduce:transition-none ${
                sort === 'desc'
                  ? 'text-white'
                  : 'text-white/65 hover:text-white/95'
              }`}
            >
              최신순
            </button>
            <button
              type="button"
              aria-pressed={sort === 'asc'}
              onClick={() => toggleSort('asc')}
              className={`relative z-10 min-w-[4.85rem] rounded-md px-3 py-1.5 text-xs font-medium outline-none ring-main-pink/40 transition-colors focus-visible:ring-2 motion-reduce:transition-none ${
                sort === 'asc'
                  ? 'text-white'
                  : 'text-white/65 hover:text-white/95'
              }`}
            >
              오래된 순
            </button>
          </div>
          {isFetchingNextPage ? (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-main-pink" aria-hidden />
          ) : null}
        </div>
      </header>

      {isError ? (
        <QueryErrorCard
          message={error instanceof Error ? error.message : '불러오기에 실패했습니다.'}
          onRetry={() => void refetch()}
        />
      ) : isLoading ? (
        <LpListSkeleton />
      ) : items.length === 0 ? (
        <p className="mx-auto w-full max-w-5xl text-center text-sm text-white/70">
          표시할 LP가 없어요.
        </p>
      ) : (
        <>
          <div className="mx-auto w-full max-w-5xl">
            <LpList items={items} />
          </div>

          {isFetchingNextPage ? <LpListSkeleton /> : null}

          <div ref={sentinelRef} className="h-6 w-full" />
        </>
      )}

      <NewLpFloatingButton />
    </main>
  )
}

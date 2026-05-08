import type { LpItem } from '../api/types'
import { LpList } from '../components/lp/LpList'
import { NewLpFloatingButton } from '../components/lp/NewLpFloatingButton'
import { useLpsQuery } from '../queries/lps'

export function LandingPage() {
  const { data, isPending, isError, error } = useLpsQuery({
    cursor: 0,
    limit: 10,
    order: 'desc',
  })

  const items: LpItem[] = data?.data.data ?? []

  return (
    <main className="relative flex min-h-0 flex-1 flex-col items-center gap-6 bg-black px-4 py-12">
      <header className="w-full max-w-5xl">
        <p className="text-2xl font-bold text-white md:text-3xl">돌려돌려LP판</p>
        <p className="mt-1 text-sm text-white/60">최신 LP 목록을 불러옵니다.</p>
      </header>

      {isPending ? (
        <p className="text-sm text-white/70">불러오는 중...</p>
      ) : isError ? (
        <p className="text-sm text-red-400">
          {error instanceof Error ? error.message : '불러오기에 실패했습니다.'}
        </p>
      ) : items.length === 0 ? (
        <p className="text-sm text-white/70">표시할 LP가 없어요.</p>
      ) : (
        <LpList items={items} />
      )}

      <NewLpFloatingButton />
    </main>
  )
}

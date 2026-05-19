const SKELETON_COUNT = 6

function LpCardSkeleton() {
  return (
    <li className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
      <div className="aspect-16/10 w-full animate-pulse bg-white/10" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-4 w-[85%] animate-pulse rounded bg-white/15" />
        <div className="h-4 w-full animate-pulse rounded bg-white/10" />
        <div className="h-4 w-[60%] animate-pulse rounded bg-white/10" />
        <div className="mt-1 flex gap-2">
          <div className="h-5 w-14 animate-pulse rounded-full bg-white/10" />
          <div className="h-5 w-14 animate-pulse rounded-full bg-white/10" />
        </div>
      </div>
    </li>
  )
}

export function LpListSkeleton() {
  return (
    <ul
      className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="목록 불러오는 중"
    >
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <LpCardSkeleton key={i} />
      ))}
    </ul>
  )
}

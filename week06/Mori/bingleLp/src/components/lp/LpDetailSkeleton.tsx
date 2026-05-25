export function LpDetailSkeleton() {
  return (
    <div
      className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10"
      aria-busy="true"
      aria-label="상세 불러오는 중"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="h-3 w-44 animate-pulse rounded bg-white/10" />
          <div className="mt-2 h-8 w-[70%] animate-pulse rounded bg-white/15" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-20 animate-pulse rounded-lg bg-white/10" />
          <div className="h-9 w-20 animate-pulse rounded-lg bg-white/10" />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="aspect-video w-full animate-pulse bg-white/10" />
        <div className="flex flex-col gap-3 p-5 sm:p-6">
          <div className="h-4 w-full animate-pulse rounded bg-white/10" />
          <div className="h-4 w-[92%] animate-pulse rounded bg-white/10" />
          <div className="h-4 w-[75%] animate-pulse rounded bg-white/10" />
          <div className="mt-2 flex gap-2">
            <div className="h-7 w-16 animate-pulse rounded-full bg-white/10" />
            <div className="h-7 w-16 animate-pulse rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  )
}


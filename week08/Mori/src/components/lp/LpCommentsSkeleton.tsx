const SKELETON_COUNT = 5

function CommentRowSkeleton() {
  return (
    <li className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 animate-pulse rounded-full bg-white/10" />
        <div className="min-w-0 flex-1">
          <div className="h-3 w-24 animate-pulse rounded bg-white/15" />
          <div className="mt-2 h-3 w-36 animate-pulse rounded bg-white/10" />
        </div>
      </div>
      <div className="mt-3 h-4 w-full animate-pulse rounded bg-white/10" />
      <div className="mt-2 h-4 w-[75%] animate-pulse rounded bg-white/10" />
    </li>
  )
}

export function LpCommentsSkeleton() {
  return (
    <ul
      className="mx-auto flex w-full max-w-5xl flex-col gap-3"
      aria-busy="true"
      aria-label="댓글 불러오는 중"
    >
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <CommentRowSkeleton key={i} />
      ))}
    </ul>
  )
}


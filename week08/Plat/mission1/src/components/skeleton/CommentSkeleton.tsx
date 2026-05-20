// src/components/skeleton/CommentSkeleton.tsx

export default function CommentSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex gap-4">
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-white/10" />

        <div className="flex-1 space-y-3">
          <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-full animate-pulse rounded bg-white/10" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}
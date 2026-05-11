export default function LpCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl">
      <div className="aspect-video animate-pulse bg-white/10" />

      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-white/10" />
        <div className="h-4 w-full animate-pulse rounded bg-white/10" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
      </div>
    </div>
  );
}
// CommentSkeleton.tsx

export function CommentSkeleton() {
  return (
    <div className="flex gap-3 animate-pulse">
      {/* avatar */}
      <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

interface CommentSkeletonListProps {
  count?: number;
}

export function CommentSkeletonList({ count = 5 }: CommentSkeletonListProps) {
  return (
    <div className="space-y-5">
      {Array.from({ length: count }, (_, i) => (
        <CommentSkeleton key={i} />
      ))}
    </div>
  );
}

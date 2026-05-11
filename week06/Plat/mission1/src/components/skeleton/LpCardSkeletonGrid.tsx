import LpCardSkeleton from "./LpCardSkeleton";

type LpCardSkeletonGridProps = {
  count?: number;
};

export default function LpCardSkeletonGrid({
  count = 6,
}: LpCardSkeletonGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <LpCardSkeleton key={index} />
      ))}
    </div>
  );
}
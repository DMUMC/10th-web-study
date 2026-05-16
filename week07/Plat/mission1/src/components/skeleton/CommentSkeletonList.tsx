import CommentSkeleton from "./CommentSkeleton";

type CommentSkeletonListProps = {
  count?: number;
};

export default function CommentSkeletonList({
  count = 4,
}: CommentSkeletonListProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <CommentSkeleton key={index} />
      ))}
    </div>
  );
}
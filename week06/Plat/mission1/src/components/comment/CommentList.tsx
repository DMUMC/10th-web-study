// src/components/comment/CommentList.tsx

import { useCallback, useMemo } from "react";
import type { PAGINATION_ORDER } from "../../enums/common";
import useGetInfiniteLpComments from "../../hooks/queries/useGetInfiniteLpComments";
import InfiniteScrollTrigger from "../InfiniteScrollTrigger";
import CommentSkeletonList from "../skeleton/CommentSkeletonList";

type CommentListProps = {
  lpId?: string;
  order: PAGINATION_ORDER;
};

export default function CommentList({ lpId, order }: CommentListProps) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteLpComments({
    lpId,
    order,
    limit: 10,
  });

  const comments = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.data) ?? [];
  }, [data]);

  const handleFetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <CommentSkeletonList count={4} />;
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-center">
        <p className="text-sm text-red-300">
          댓글을 불러오지 못했습니다.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-gray-400">
        아직 댓글이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <div className="flex gap-4">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-purple-500/60">
              {comment.author.avatar ? (
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                  {comment.author.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-white">
                  {comment.author.name}
                </p>
                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString("ko-KR")}
                </span>
              </div>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-300">
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      ))}

      <InfiniteScrollTrigger
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onIntersect={handleFetchNextPage}
      />

      {isFetchingNextPage && (
        <div className="pt-2">
          <CommentSkeletonList count={2} />
        </div>
      )}

      {!hasNextPage && (
        <p className="pt-4 text-center text-xs text-gray-500">
          더 이상 불러올 댓글이 없습니다.
        </p>
      )}
    </div>
  );
}
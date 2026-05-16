// src/components/comment/CommentList.tsx

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { PAGINATION_ORDER } from "../../enums/common";
import useGetInfiniteLpComments from "../../hooks/queries/useGetInfiniteLpComments";
import InfiniteScrollTrigger from "../InfiniteScrollTrigger";
import CommentSkeletonList from "../skeleton/CommentSkeletonList";
import { getMyInfo } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key";
import { useAuth } from "../../context/AuthContext";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../hooks/mutations/useCommentMutations";

type CommentListProps = {
  lpId?: string;
  order: PAGINATION_ORDER;
};

export default function CommentList({ lpId, order }: CommentListProps) {
  const { accessToken } = useAuth();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const updateCommentMutation = useUpdateCommentMutation(Number(lpId));
  const deleteCommentMutation = useDeleteCommentMutation(Number(lpId));

  const { data: myInfo } = useQuery({
    queryKey: [QUERY_KEY.my],
    queryFn: getMyInfo,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
    select: (response) => response.data,
  });

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

  const handleStartEdit = (commentId: number, content: string) => {
    setEditingId(commentId);
    setEditingContent(content);
    setOpenMenuId(null);
  };

  const handleUpdateComment = async (commentId: number) => {
    if (!lpId || editingContent.trim().length === 0) return;

    await updateCommentMutation.mutateAsync({
      lpId: Number(lpId),
      commentId,
      body: {
        content: editingContent.trim(),
      },
    });

    setEditingId(null);
    setEditingContent("");
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!lpId || !window.confirm("댓글을 삭제할까요?")) return;

    await deleteCommentMutation.mutateAsync({
      lpId: Number(lpId),
      commentId,
    });
    setOpenMenuId(null);
  };

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
          className="relative rounded-2xl border border-white/10 bg-white/5 p-5"
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
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-white">
                    {comment.author.name}
                  </p>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString("ko-KR")}
                  </span>
                </div>

                {myInfo?.id === comment.author.id && (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuId((prev) =>
                          prev === comment.id ? null : comment.id
                        )
                      }
                      aria-label="댓글 메뉴 열기"
                      className="rounded-full px-2 py-1 text-xl leading-none text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      ...
                    </button>

                    {openMenuId === comment.id && (
                      <div className="absolute right-0 top-8 z-10 w-24 overflow-hidden rounded-xl border border-white/10 bg-gray-900 shadow-xl">
                        <button
                          type="button"
                          onClick={() =>
                            handleStartEdit(comment.id, comment.content)
                          }
                          className="block w-full px-3 py-2 text-left text-sm text-gray-200 hover:bg-white/10"
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteComment(comment.id)}
                          className="block w-full px-3 py-2 text-left text-sm text-red-300 hover:bg-red-500/10"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {editingId === comment.id ? (
                <div className="mt-3 space-y-3">
                  <textarea
                    value={editingContent}
                    onChange={(event) => setEditingContent(event.target.value)}
                    maxLength={300}
                    className="min-h-24 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-purple-400"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setEditingContent("");
                      }}
                      className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      disabled={
                        editingContent.trim().length === 0 ||
                        updateCommentMutation.isPending
                      }
                      onClick={() => handleUpdateComment(comment.id)}
                      className="rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-600 disabled:bg-gray-700 disabled:text-gray-400"
                    >
                      {updateCommentMutation.isPending ? "수정 중..." : "저장"}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-300">
                  {comment.content}
                </p>
              )}
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

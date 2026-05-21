import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { PAGINATION_ORDER } from "../enums/common.ts";
import useGetLp from "../hooks/queries/useGetLp.ts";
import useInfiniteLpComments from "../hooks/queries/useInfiniteLpComments.ts";
import { CommentSkeletonList } from "../components/CommentSkeleton.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { createComment } from "../apis/lp.ts";

function LpDetailPage() {
  const { lpId } = useParams();
  const navigate = useNavigate();
  const numericLpId = Number(lpId);

  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [commentInput, setCommentInput] = useState("");
  const [touched, setTouched] = useState(false);
  const queryClient = useQueryClient();

  // LP 상세 조회
  const { data: lp, isPending: lpPending } = useGetLp(numericLpId);

  // 댓글 무한 스크롤
  const {
    data: commentsData,
    isPending: commentsPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteLpComments({ lpId: numericLpId, order, limit: 10 });

  // 바닥 감지
  const { ref: bottomRef, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 댓글 목록 flat
  const comments =
    commentsData?.pages.flatMap((page) => page.data.data ?? []) ?? [];

  // 댓글 유효성
  const isCommentEmpty = commentInput.trim().length === 0;
  const showError = touched && isCommentEmpty;

  const handleSubmitComment = async () => {
    if (isCommentEmpty) {
      setTouched(true);
      return;
    }

    try {
      await createComment({ lpId: numericLpId, content: commentInput }); // ← 실제 API 호출

      await queryClient.invalidateQueries({                               // ← 그 다음 목록 갱신
        queryKey: ["lpComments", numericLpId, order],
      });

      setCommentInput("");
      setTouched(false);
    } catch (error) {
      console.error("댓글 작성 실패:", error);
    }
  };

  return (
    <div className="mt-20 flex flex-col items-center w-full max-w-2xl mx-auto px-4 pb-20">

      {/* ── LP 정보 ── */}
      {lpPending ? (
        <div className="animate-pulse w-full space-y-4 mt-10">
          <div className="w-60 h-60 rounded-full bg-gray-200 mx-auto" />
          <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-4/5" />
        </div>
      ) : (
        <>
          <div className="w-full flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-bold flex-1">{lp?.data?.title}</h1>
            <button className="w-15 h-10 border rounded-md text-sm hover:bg-gray-100">수정</button>
            <button className="w-15 h-10 border rounded-md text-sm text-red-500 hover:bg-red-50">삭제</button>
          </div>

          <div className="relative w-60 h-60 flex justify-center items-center bg-pink-200 rounded-full mb-6">
            <div className="absolute rounded-full w-20 h-20 bg-white border-2 border-gray-300 z-10"></div>
            <img
              src={lp?.data?.thumbnail}
              alt={lp?.data?.title}
              className="w-56 h-56 rounded-full object-cover"
            />
          </div>

          <p className="text-gray-700 text-center mb-4">{lp?.data?.content}</p>

          <div className="text-xl mb-10">
            ❤️ {lp?.data?.likes?.length ?? 0}
          </div>
        </>
      )}

      {/* ── 댓글 섹션 ── */}
      <div className="w-full">

        {/* 정렬 토글 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">댓글</h2>
          <div className="flex rounded-lg overflow-hidden border border-gray-300">
            <button
              onClick={() => setOrder(PAGINATION_ORDER.desc)}
              className={`px-4 py-1.5 text-sm font-semibold transition-colors ${order === PAGINATION_ORDER.desc
                ? "bg-pink-400 text-white"
                : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
            >
              최신순
            </button>
            <button
              onClick={() => setOrder(PAGINATION_ORDER.asc)}
              className={`px-4 py-1.5 text-sm font-semibold transition-colors ${order === PAGINATION_ORDER.asc
                ? "bg-pink-400 text-white"
                : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
            >
              오래된순
            </button>
          </div>
        </div>

        {/* 댓글 작성란 */}
        <div className="border border-gray-200 rounded-2xl p-4 mb-6 space-y-3 bg-gray-50">
          <p className="text-sm font-semibold text-gray-600">댓글 작성</p>
          <textarea
            value={commentInput}
            onChange={(e) => {
              setCommentInput(e.target.value);
              if (touched) setTouched(false);
            }}
            onBlur={() => setTouched(true)}
            rows={3}
            placeholder="댓글을 입력해주세요..."
            className={`w-full bg-white border rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none resize-none transition-colors ${showError
              ? "border-red-400 focus:border-red-400"
              : "border-gray-300 focus:border-pink-400"
              }`}
          />
          {/* 유효성 안내 */}
          {showError && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              ⚠ 댓글 내용을 입력해주세요.
            </p>
          )}
          <div className="flex justify-end">
            <button
              onClick={handleSubmitComment}
              className="bg-pink-400 hover:bg-pink-500 text-white text-sm font-bold px-5 py-2 rounded-xl transition-colors"
            >
              등록
            </button>
          </div>
        </div>

        {/* 댓글 목록 */}
        <div className="space-y-5">
          {/* 초기 로딩: 상단 스켈레톤 */}
          {commentsPending && <CommentSkeletonList count={5} />}

          {/* 실제 댓글 */}
          {!commentsPending &&
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-pink-200 flex items-center justify-center text-sm font-bold shrink-0 text-pink-700">
                  {comment.user?.name?.[0] ?? "?"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">
                      {comment.author?.name ?? "익명"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}

          {/* 추가 로딩: 하단 스켈레톤 */}
          {isFetchingNextPage && <CommentSkeletonList count={3} />}
        </div>

        {/* 바닥 감지 트리거 */}
        <div ref={bottomRef} className="h-8" />

        {!hasNextPage && !commentsPending && comments.length > 0 && (
          <p className="text-center text-gray-400 text-xs mt-4">
            모든 댓글을 불러왔습니다.
          </p>
        )}

        {!commentsPending && comments.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-8">
            첫 댓글을 남겨보세요! 🎵
          </p>
        )}
      </div>
    </div>
  );
}

export default LpDetailPage;

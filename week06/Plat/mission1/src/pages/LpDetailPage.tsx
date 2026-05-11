import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { ErrorState, LoadingState } from "../components/QueryStatus";
import type { PAGINATION_ORDER } from "../enums/common";
import CommentInputBox from "../components/comment/CommentInputBox";
import CommentList from "../components/comment/CommentList";

export default function LpDetailPage() {
  const { lpid } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(!accessToken);
  const [commentOrder, setCommentOrder] = useState<PAGINATION_ORDER>("desc");

  const {
    data: lp,
    isPending,
    isError,
    refetch,
  } = useGetLpDetail(lpid, !!accessToken);

  const handleGoLogin = () => {
    navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
  };

  const handleToggleCommentOrder = () => {
    setCommentOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  if (!accessToken && isLoginModalOpen) {
    return (
      <div className="flex min-h-[500px] items-center justify-center text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-gray-900 p-8 text-center shadow-2xl">
          <h1 className="text-2xl font-bold">로그인이 필요합니다</h1>
          <p className="mt-3 text-sm text-gray-400">
            LP 상세 페이지는 로그인 후 확인할 수 있습니다.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIsLoginModalOpen(false);
                navigate("/");
              }}
              className="rounded-2xl border border-white/10 px-5 py-2 text-sm font-semibold text-gray-300 transition-colors hover:bg-white/10"
            >
              취소
            </button>

            <button
              type="button"
              onClick={handleGoLogin}
              className="rounded-2xl bg-purple-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-600"
            >
              로그인하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isPending) {
    return <LoadingState message="LP 상세 정보를 불러오는 중입니다..." />;
  }

  if (isError || !lp) {
    return (
      <ErrorState
        message="LP 상세 정보를 불러오지 못했습니다."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl space-y-8 text-white">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
        <div className="aspect-video bg-gray-800">
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-8">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">{lp.title}</h1>

              <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-400">
                <span>
                  업로드일 {new Date(lp.createdAt).toLocaleDateString("ko-KR")}
                </span>
                <span>좋아요 {lp.likes?.length ?? 0}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold transition-colors hover:bg-blue-600"
              >
                수정
              </button>

              <button
                type="button"
                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold transition-colors hover:bg-red-600"
              >
                삭제
              </button>

              <button
                type="button"
                className="rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold transition-colors hover:bg-pink-600"
              >
                좋아요
              </button>
            </div>
          </div>

          <article className="prose prose-invert mt-8 max-w-none">
            <p className="whitespace-pre-wrap text-base leading-8 text-gray-200">
              {lp.content}
            </p>
          </article>
        </div>
      </div>

      <div className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">댓글</h2>
            <p className="mt-1 text-sm text-gray-400">
              Cat에 대한 의견을 확인할 수 있습니다.
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleCommentOrder}
            className="w-fit rounded-2xl border border-white/10 bg-white/10 px-5 py-2 text-sm font-semibold transition-colors hover:bg-white/20"
          >
            {commentOrder === "desc" ? "최신순" : "오래된순"}
          </button>
        </div>

        <CommentInputBox />

        <CommentList lpId={lpid} order={commentOrder} />
      </div>
    </section>
  );
}
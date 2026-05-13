import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLpList";
import type { PAGINATION_ORDER } from "../enums/common";
import { ErrorState, LoadingState } from "../components/QueryStatus";

export default function HomePage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<PAGINATION_ORDER>("desc");

  const {
    data: lpList = [],
    isPending,
    isError,
    refetch,
  } = useGetLpList({
    order,
    limit: 20,
  });

  const handleToggleOrder = () => {
    setOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  if (isPending) {
    return <LoadingState message="Cat 목록을 불러오는 중입니다..." />;
  }

  if (isError) {
    return (
      <ErrorState
        message="Cat 목록을 불러오지 못했습니다."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl text-white">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cat 목록</h1>
          <p className="mt-2 text-sm text-gray-400">
            원하는 Cat를 선택하면 상세 페이지로 이동합니다.
          </p>
        </div>

        <button
          type="button"
          onClick={handleToggleOrder}
          className="w-fit rounded-2xl border border-white/10 bg-white/10 px-5 py-2 text-sm font-semibold transition-colors hover:bg-white/20"
        >
          {order === "desc" ? "최신순" : "오래된순"}
        </button>
      </div>

      {lpList.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-gray-400">
          등록된 LP가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lpList.map((lp) => (
            <button
              type="button"
              key={lp.id}
              onClick={() => navigate(`/lp/${lp.id}`)}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left shadow-xl transition-transform duration-300 hover:scale-[1.03] hover:border-purple-400/60"
            >
              <div className="relative aspect-video overflow-hidden bg-gray-800">
                <img
                  src={lp.thumbnail}
                  alt={lp.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 flex flex-col justify-end bg-black/0 p-5 opacity-0 transition-all duration-300 group-hover:bg-black/60 group-hover:opacity-100">
                  <h2 className="text-lg font-bold text-white">{lp.title}</h2>

                  <div className="mt-3 flex items-center justify-between text-xs text-gray-300">
                    <span>
                      {new Date(lp.createdAt).toLocaleDateString("ko-KR")}
                    </span>
                    <span>좋아요 {lp.likes?.length ?? 0}</span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h2 className="line-clamp-1 text-lg font-bold">{lp.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                  {lp.content}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
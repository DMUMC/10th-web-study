// MainPage.tsx  (메인 페이지)
// - useInfiniteQuery  queryKey: ['lps', sort]
// - getNextPageParam → nextCursor
// - react-intersection-observer 로 바닥 감지 → fetchNextPage()
// - 초기 로딩(isPending): 상단에 SkeletonList
// - 추가 로딩(isFetchingNextPage): 하단에 SkeletonList

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { PAGINATION_ORDER } from "../enums/common";
import useInfiniteLpList from "../hooks/queries/useInfiniteLpList";
import { LpCard, LpCardSkeletonList } from "../components/LpCard";

export default function MainPage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // 바닥 감지 ref (react-intersection-observer)
  const { ref: bottomRef, inView } = useInView({ threshold: 0 });

  const {
    data,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
  } = useInfiniteLpList({ order, search, limit: 12 });

  // 바닥이 보이면 다음 페이지 요청
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // pages를 flat하게 펼쳐 단일 배열로
  const lpItems =
    data?.pages.flatMap((page) => page.data.data ?? []) ?? [];

  const handleSearch = () => {
    setSearch(searchInput);
  };

  return (
    <div className="min-h-screen bg-white-950 text-white mt-30">
      {/* <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur border-b border-zinc-800 px-6 py-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-black tracking-tight text-pink-400 shrink-0">
          🎵 LP World
        </h1>

        <div className="flex gap-2 flex-1 max-w-sm">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="검색어 입력..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder-zinc-500 focus:outline-none focus:border-pink-400"
          />
          <button
            onClick={handleSearch}
            className="bg-pink-500 hover:bg-pink-400 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
          >
            검색
          </button>
        </div>

        <div className="flex rounded-lg overflow-hidden border border-zinc-700 shrink-0">
          <button
            onClick={() => setOrder(PAGINATION_ORDER.desc)}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${order === PAGINATION_ORDER.desc
                ? "bg-pink-500 text-white"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
          >
            최신순
          </button>
          <button
            onClick={() => setOrder(PAGINATION_ORDER.asc)}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${order === PAGINATION_ORDER.asc
                ? "bg-pink-500 text-white"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
          >
            오래된순
          </button>
        </div>
      </header> */}

      {/* ── 콘텐츠 ── */}
      <main className="px-6 py-8 max-w-6xl mx-auto">
        {isError && (
          <p className="text-red-400 text-center py-20">
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* 초기 로딩: 상단에 스켈레톤 */}
          {isPending && <LpCardSkeletonList count={12} />}

          {/* 실제 데이터 */}
          {!isPending &&
            lpItems.map((lp) => <LpCard key={lp.id} lp={lp} />)}

          {/* 추가 로딩: 하단에 스켈레톤 */}
          {isFetchingNextPage && <LpCardSkeletonList count={4} />}
        </div>

        {/* 바닥 감지 트리거 (invisible) */}
        <div ref={bottomRef} className="h-10" />

        {/* 마지막 페이지 안내 */}
        {!hasNextPage && !isPending && lpItems.length > 0 && (
          <p className="text-center text-zinc-500 text-sm mt-6">
            모든 LP를 불러왔습니다 🎶
          </p>
        )}

        {/* 검색 결과 없음 */}
        {!isPending && lpItems.length === 0 && !isError && (
          <p className="text-center text-zinc-500 text-sm mt-20">
            검색 결과가 없습니다.
          </p>
        )}
      </main>

      {/* ── FAB ── */}
      <button
        onClick={() => navigate("/search")}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-pink-500 hover:bg-pink-400 text-white text-2xl shadow-xl hover:scale-110 transition-transform duration-200 flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
}

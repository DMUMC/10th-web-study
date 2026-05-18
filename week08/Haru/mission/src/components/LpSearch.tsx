import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { getSearchData } from "../apis/serach";

export default function LpSearch({ onSearchChange }: { onSearchChange: (val: string) => void }) {
  const [inputValue, setInputValue] = useState("");
  const debouncedQuery = useDebounce(inputValue, 300);
  const navigate = useNavigate();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: ({ pageParam = 0 }) => getSearchData(debouncedQuery, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    enabled: debouncedQuery.trim() !== "",
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="원하는 LP 제목을 입력하세요..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onSearchChange(e.target.value);
          }}
          className="w-full bg-gray-900 text-white placeholder-gray-500 text-sm pl-10 pr-4 py-2.5 rounded-lg border border-gray-800 focus:outline-none focus:border-[#FF007A] transition-colors"
        />
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.603 10.603z" />
          </svg>
        </div>
      </div>

      {debouncedQuery.trim() !== "" && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-400">"{debouncedQuery}" 검색 결과</h3>
          
          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="aspect-square rounded-md bg-gray-800 animate-pulse" />
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data?.pages.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.data.data.map((lp: any) => (
                  <div 
                    key={lp.id} 
                    onClick={() => navigate(`/lp/${lp.id}`)}
                    className="group relative aspect-square overflow-hidden rounded-md bg-[#1e1e1e] shadow-lg cursor-pointer"
                  >
                    <img 
                      src={lp.thumbnail} 
                      alt={lp.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                      <p className="font-bold text-sm truncate">{lp.title}</p>
                      <p className="text-[10px] text-gray-300 mt-0.5">
                        {lp.createdAt ? new Date(lp.createdAt).toLocaleDateString() : ''}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-[#FF007A]">
                          ♥ {lp.likes ? lp.likes.length : 0}
                        </span>
                        <span className="text-[10px] border border-white/40 px-2 py-0.5 rounded">상세보기</span>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>

          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="w-full bg-gray-800 text-gray-400 hover:text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors"
            >
              {isFetchingNextPage ? "로딩 중..." : "검색 결과 더보기"}
            </button>
          )}

          {!isLoading && data?.pages[0]?.data.data.length === 0 && (
            <div className="py-10 text-center text-gray-500 text-sm">검색 결과가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLpList";
import { PAGINATION_ORDER } from "../enums/common";

const HomePage = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const navigate = useNavigate();
  
  const { data, isLoading, isError, refetch } = useGetLpList({
    cursor: 0,
    search: "",
    order: order,
    limit: 50
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2 animate-pulse">
            <div className="aspect-square rounded-md bg-gray-800" />
            <div className="h-4 w-3/4 bg-gray-800 rounded mt-1" />
            <div className="h-3 w-1/2 bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-red-500">목록 로드에 실패했습니다.</p>
        <button 
          onClick={() => refetch()} 
          className="bg-[#FF007A] text-white px-6 py-2 rounded-md font-bold hover:bg-[#e6006e] transition-colors"
        >
          재시도
        </button>
      </div>
    );
  }

  const lpList = data?.data?.data || [];

  return (
    <div className="space-y-8">
      <div className="flex justify-end items-center gap-2">
        <button 
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            order === PAGINATION_ORDER.desc ? "bg-[#FF007A] text-white" : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          최신순
        </button>
        <button 
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            order === PAGINATION_ORDER.asc ? "bg-[#FF007A] text-white" : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          오래된 순
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {lpList.map((lp) => (
          <div 
            key={lp.id} 
            onClick={() => navigate(`/lp/${lp.id}`)}
            className="group flex flex-col gap-2 cursor-pointer"
          >
            <div className="relative aspect-square overflow-hidden rounded-md bg-[#1e1e1e] shadow-lg">
              <img 
                src={lp.thumbnail} 
                alt={lp.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <p className="font-bold text-sm truncate">{lp.title}</p>
                <p className="text-[10px] text-gray-300 mt-0.5">
                  {lp.createdAt ? new Date(lp.createdAt).toLocaleDateString() : '2026-05-05'}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-[#FF007A]">
                    ♥ {lp.likes ? lp.likes.length : 0}
                  </span>
                  <span className="text-[10px] border border-white/40 px-2 py-0.5 rounded">상세보기</span>
                </div>
              </div>
            </div>
          
          </div>
        ))}
      </div>

      {lpList.length === 0 && (
        <div className="py-20 text-center text-gray-500">등록된 LP가 없습니다.</div>
      )}
    </div>
  );
};

export default HomePage;
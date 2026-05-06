import { useParams, useNavigate } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();
  
  const { data, isLoading, isError, refetch } = useGetLpDetail(lpid || "");

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-20 text-center animate-pulse text-white">
        상세 정보를 불러오는 중...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto p-20 text-center text-white space-y-4">
        <p>정보를 가져오지 못했습니다.</p>
        <button 
          onClick={() => refetch()} 
          className="bg-[#FF007A] px-4 py-2 rounded font-bold hover:bg-[#e6006e] transition-colors"
        >
          재시도
        </button>
      </div>
    );
  }

  const lp = data?.data;

  return (
    <div className="max-w-4xl mx-auto p-6 text-white space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden">
            {lp?.user?.profileImage && (
              <img src={lp.user.profileImage} alt="profile" className="w-full h-full object-cover" />
            )}
          </div>
          <span className="font-semibold">{lp?.user?.nickname || "사용자"}</span>
        </div>
        <span className="text-sm text-gray-400">
          {lp?.createdAt ? new Date(lp.createdAt).toLocaleDateString() : "2026-05-05"}
        </span>
      </div>

      <div className="flex justify-between items-start border-b border-gray-800 pb-4">
        <h1 className="text-4xl font-bold">{lp?.title}</h1>
        <div className="flex gap-4 text-sm text-gray-400 mt-2">
          <button className="hover:text-white transition-colors">수정</button>
          <button className="hover:text-white transition-colors">삭제</button>
        </div>
      </div>

      <div className="flex justify-center py-10 bg-[#121212] rounded-2xl shadow-inner relative overflow-hidden group">
        <div className="relative w-72 h-72 sm:w-96 sm:h-96">
          <img 
            src={lp?.thumbnail} 
            alt={lp?.title} 
            className="w-full h-full object-cover rounded-full shadow-2xl animate-[spin_20s_linear_infinite]" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-[#121212] rounded-full border-[6px] border-gray-900 z-10" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="min-h-[150px] text-lg text-gray-200 leading-relaxed whitespace-pre-wrap bg-gray-900/30 p-6 rounded-xl">
          {lp?.content}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {lp?.tags?.map((tag: string) => (
            <span key={tag} className="text-xs bg-gray-800 text-[#FF007A] px-4 py-1.5 rounded-full border border-[#FF007A]/20">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 py-10 border-t border-gray-800">
        <button className="group flex flex-col items-center gap-2">
          <div className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-700 group-hover:border-[#FF007A] transition-all">
            <span className="text-3xl text-[#FF007A] group-hover:scale-125 transition-transform">♥</span>
          </div>
          <span className="text-lg font-medium">{lp?.likes?.length || 0}</span>
        </button>
      </div>
    </div>
  );
};

export default LpDetailPage;
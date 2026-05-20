import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { useGetLpComments } from "../hooks/queries/useGetLpComments";
import { PAGINATION_ORDER } from "../enums/common";
import { type CommentItem } from "../types/lp";

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const { ref, inView } = useInView();

  const [commentInput, setCommentInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { data: detailData, isLoading: isDetailLoading } = useGetLpDetail(lpid || "");

  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isCommentLoading,
  } = useGetLpComments(lpid || "", order);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) {
      setErrorMsg("댓글 내용을 입력해주세요.");
      return;
    }
    
    console.log("제출할 데이터:", commentInput);
    
    setCommentInput("");
    setErrorMsg("");
  };

  if (isDetailLoading) {
    return <div className="max-w-4xl mx-auto p-20 text-center animate-pulse text-white">상세 정보를 불러오는 중...</div>;
  }

  const lp = detailData?.data;

  return (
    <div className="max-w-4xl mx-auto p-6 text-white space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden">
            {lp?.user?.profileImage && <img src={lp.user.profileImage} alt="profile" className="w-full h-full object-cover" />}
          </div>
          <span className="font-semibold">{lp?.user?.nickname || "사용자"}</span>
        </div>
      </div>

      <div className="flex justify-center py-10 bg-[#121212] rounded-2xl">
        <div className="relative w-72 h-72 sm:w-96 sm:h-96">
          <img src={lp?.thumbnail} alt={lp?.title} className="w-full h-full object-cover rounded-full animate-[spin_20s_linear_infinite]" />
        </div>
      </div>

      <div className="pt-10 border-t border-gray-800 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">댓글</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setOrder(PAGINATION_ORDER.desc)}
              className={`px-3 py-1 text-xs rounded ${order === PAGINATION_ORDER.desc ? "bg-white text-black" : "bg-gray-800 text-gray-400"}`}
            >
              최신순
            </button>
            <button 
              onClick={() => setOrder(PAGINATION_ORDER.asc)}
              className={`px-3 py-1 text-xs rounded ${order === PAGINATION_ORDER.asc ? "bg-white text-black" : "bg-gray-800 text-gray-400"}`}
            >
              오래된순
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={commentInput}
              onChange={(e) => {
                setCommentInput(e.target.value);
                if (e.target.value.trim()) setErrorMsg("");
              }}
              placeholder="댓글을 입력해주세요" 
              className={`flex-1 bg-gray-900 border ${errorMsg ? 'border-red-500' : 'border-gray-800'} rounded-md px-4 py-2 focus:outline-none focus:border-[#FF007A] text-sm`}
            />
            <button 
              onClick={handleCommentSubmit}
              className="bg-gray-700 px-6 py-2 rounded-md font-bold text-sm hover:bg-[#FF007A] transition-colors"
            >
              작성
            </button>
          </div>
          {errorMsg && <p className="text-red-500 text-xs pl-1">{errorMsg}</p>}
        </div>

        <div className="space-y-4">
          {isCommentLoading ? (
            <CommentSkeleton count={3} />
          ) : (
            commentData?.pages.map((page) =>
              page.data.map((comment: CommentItem) => (
                <div key={comment.id} className="flex gap-3 py-4 border-b border-gray-900 last:border-0">
                  <div className="w-8 h-8 bg-gray-800 rounded-full shrink-0 overflow-hidden">
                    {comment.author.avatar && <img src={comment.author.avatar} alt="avatar" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-bold">{comment.author.name}</span>
                    </div>
                    <p className="text-sm text-gray-300">{comment.content}</p>
                  </div>
                </div>
              ))
            )
          )}

          <div ref={ref} className="py-6">
            {isFetchingNextPage && <CommentSkeleton count={1} />}
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentSkeleton = ({ count }: { count: number }) => (
  <>
    {[...Array(count)].map((_, i) => (
      <div key={i} className="flex gap-3 py-4 animate-pulse">
        <div className="w-8 h-8 bg-gray-800 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-20 bg-gray-800 rounded" />
          <div className="h-3 w-full bg-gray-800 rounded" />
        </div>
      </div>
    ))}
  </>
);

export default LpDetailPage;
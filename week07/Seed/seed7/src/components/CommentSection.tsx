import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetLpComments } from "../hooks/queries/useGetLpComments";
import { useCommentMutation } from "../hooks/diverse/useCommentMutation";
import { PAGINATION_ORDER } from "../enums/common";

interface CommentSectionProps {
  lpId: string;
}

const CommentSection = ({ lpId }: CommentSectionProps) => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const { ref, inView } = useInView();
  const [commentInput, setCommentInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetLpComments(lpId, order);

  const { createComment, updateComment, deleteComment, isPending } = useCommentMutation(lpId);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;
    createComment(commentInput, {
      onSuccess: () => setCommentInput(""),
    });
  };

  const startEdit = (id: number, content: string) => {
    setEditingId(id);
    setEditContent(content);
    setOpenMenuId(null);
  };

  const handleUpdate = (commentId: number) => {
    if (!editContent.trim()) return;
    updateComment({ commentId, content: editContent }, {
      onSuccess: () => setEditingId(null)
    });
  };

  return (
    <div className="pt-10 border-t border-gray-800 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">댓글</h2>
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

      <div className="flex gap-2">
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
          placeholder="댓글을 입력해주세요"
          className="flex-1 bg-gray-900 border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:border-[#FF007A] text-sm text-white"
        />
        <button
          disabled={isPending}
          onClick={handleCommentSubmit}
          className="bg-gray-700 px-6 py-2 rounded-md font-bold text-sm hover:bg-[#FF007A] text-white transition-colors disabled:opacity-50"
        >
          작성
        </button>
      </div>

      <div className="space-y-4">
        {commentData?.pages.map((page) =>
          page.data.map((comment: any) => (
            <div key={comment.id} className="flex gap-3 py-4 border-b border-gray-900 last:border-0 relative">
              <div className="w-8 h-8 bg-gray-800 rounded-full shrink-0 overflow-hidden">
                {comment.author?.avatar && <img src={comment.author.avatar} alt="avatar" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-bold text-white">{comment.author?.name}</span>

                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === comment.id ? null : comment.id);
                      }}
                      className="text-white hover:text-white p-1 text-lg leading-none"
                    >
                      ⋮
                    </button>

                    {openMenuId === comment.id && (
                      <div className="absolute right-0 mt-1 w-24 bg-gray-800 border border-gray-700 rounded shadow-2xl z-[100] overflow-hidden">
                        <button
                          onClick={() => startEdit(comment.id, comment.content)}
                          className="w-full text-left px-4 py-2 text-xs text-white hover:bg-gray-700 border-b border-gray-700"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => { if (window.confirm("삭제하시겠습니까?")) deleteComment(comment.id); }}
                          className="w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-gray-700"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {editingId === comment.id ? (
                  <div className="flex gap-2 mt-2">
                    <input
                      autoFocus
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="flex-1 bg-gray-900 border border-[#FF007A] rounded px-3 py-1 text-sm text-white outline-none"
                    />
                    <div className="flex gap-2 items-center">
                      <button onClick={() => handleUpdate(comment.id)} className="text-[#FF007A] text-xs font-bold whitespace-nowrap">확인</button>
                      <button onClick={() => setEditingId(null)} className="text-gray-500 text-xs font-bold whitespace-nowrap">취소</button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-300 leading-relaxed">{comment.content}</p>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={ref} className="h-10" />
      </div>
    </div>
  );
};

export default CommentSection;
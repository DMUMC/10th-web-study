import { useState } from 'react'
import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { useGetMyInfo } from "../hooks/queries/useGetMyInfo";
import CommentSection from "../components/CommentSection";
import { useLpLike } from '../hooks/mutations/useLpLike';
import { useLpDelete } from '../hooks/mutations/useLpDelete';
import { axiosInstance } from '../apis/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../constans/key';
import { type Likes, type Tag } from '../types/lp';

const LpDetailPage = () => {
    const { lpid } = useParams<{ lpid: string }>();
    const { data: detailData, isLoading: isDetailLoading } = useGetLpDetail(lpid || "");
    const { data: myInfoData } = useGetMyInfo();
    const { like, unlike } = useLpLike(lpid || "");
    const { mutate: deleteLp, isPending: isDeleting } = useLpDelete(lpid || "");
    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const lp = detailData?.data;
    const myId = myInfoData?.data?.id;
    const isOwner = myId !== undefined && lp?.authorId !== undefined && myId === lp.authorId;
    const isLiked = lp?.likes?.some((like: Likes) => like.userId === myId);

    const updateLp = useMutation({
        mutationFn: async () => {
            const { data } = await axiosInstance.patch(`/v1/lps/${lpid}`, {
                title: editTitle,
                content: editContent,
                thumbnail: lp?.thumbnail,
                tags: lp?.tags?.map((tag: Tag) => tag.name) ?? [],
                published: lp?.published ?? true,
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lp, lpid] });
            setIsEditing(false);
        },
        onError: (error: any) => alert(error.response?.data?.message || '수정 실패')
    });

    const handleEditStart = () => {
        setEditTitle(lp?.title || "");
        setEditContent(lp?.content || "");
        setIsEditing(true);
    };

    const handleLikeToggle = () => {
        if (isLiked) unlike.mutate();
        else like.mutate();
    };

    if (isDetailLoading) {
        return <div className="max-w-4xl mx-auto p-20 text-center animate-pulse text-white">상세 정보를 불러오는 중...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 text-white space-y-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden">
                        {lp?.user?.avatar && (
                            <img src={lp.user.avatar} alt="profile" className="w-full h-full object-cover" />
                        )}
                    </div>
                    <span className="font-semibold">{lp?.user?.name || "사용자"}</span>
                </div>

                {isOwner && !isEditing && (
                    <div className="flex gap-3">
                        <button
                            onClick={handleEditStart}
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            ✏️ 수정
                        </button>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                        >
                            🗑️ 삭제
                        </button>
                    </div>
                )}

                {isEditing && (
                    <div className="flex gap-3">
                        <button
                            onClick={() => updateLp.mutate()}
                            disabled={updateLp.isPending}
                            className="text-sm text-[#FF007A] hover:opacity-80 transition-opacity disabled:opacity-50"
                        >
                            {updateLp.isPending ? '저장 중...' : '✔ 저장'}
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            ✕ 취소
                        </button>
                    </div>
                )}
            </div>

            <div className="flex justify-center py-10 bg-[#121212] rounded-2xl">
                <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                    <img
                        src={lp?.thumbnail}
                        alt={lp?.title}
                        className="w-full h-full object-cover rounded-full animate-[spin_20s_linear_infinite]"
                    />
                </div>
            </div>

            <div className="space-y-4">
                {isEditing ? (
                    <div className="space-y-3">
                        <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-2 text-3xl font-bold outline-none focus:border-[#FF007A]"
                        />
                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            rows={4}
                            className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-2 text-gray-400 outline-none focus:border-[#FF007A] resize-none"
                        />
                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold">{lp?.title}</h1>
                        <p className="text-gray-400">{lp?.content}</p>
                    </>
                )}

                <button
                    onClick={handleLikeToggle}
                    disabled={like.isPending || unlike.isPending}
                    className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full border transition-colors disabled:opacity-50 ${
                        isLiked
                            ? 'border-[#FF007A] text-[#FF007A]'
                            : 'border-gray-600 text-gray-400 hover:border-[#FF007A] hover:text-[#FF007A]'
                    }`}
                >
                    {isLiked ? '❤️' : '🤍'} {lp?.likes?.length ?? 0}
                </button>
            </div>

            <CommentSection lpId={lpid || ""} />

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center">
                    <div className="bg-[#1e1e1e] border border-white/10 rounded-2xl p-8 w-[320px] shadow-2xl">
                        <p className="text-white text-center text-base font-medium mb-6">
                            정말 삭제하시겠습니까?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 py-3 bg-[#2a2a2a] hover:bg-[#333] text-white rounded-xl font-medium transition-colors"
                            >
                                아니오
                            </button>
                            <button
                                onClick={() => { deleteLp(); setShowDeleteConfirm(false); }}
                                disabled={isDeleting}
                                className="flex-1 py-3 bg-[#FF007A] hover:bg-[#ff1a87] text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                            >
                                {isDeleting ? '삭제 중...' : '예'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LpDetailPage;
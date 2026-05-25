import { useState } from "react";
import { Link } from "react-router-dom";
import useMemberOut from "../hooks/mutations/useMemberOut";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const [memberOut, setMemberOut] = useState(false);
    const { mutate: deleteUser, isPending } = useMemberOut();
    return (
        <>
            {/* 배경 오버레이 */}
            {isOpen && (
                <div
                    onClick={onClose}
                />
            )}

            {/* 사이드바 */}
            <aside
                className={`
                    fixed top-21 left-0 h-[calc(100vh-64px)] w-64 bg-white text-black
                    flex flex-col justify-between p-6 z-50
                    transition-transform duration-300
                    shadow-lg
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="marginTop-30">

                    <nav className="flex flex-col gap-6">
                        <Link
                            to="/search"
                            className="hover:text-pink-400 transition"
                        >
                            🔍 찾기
                        </Link>

                        <Link
                            to="/my"
                            className="hover:text-pink-400 transition"
                        >
                            👤 마이페이지
                        </Link>
                    </nav>
                </div>

                <button
                    onClick={() => {
                        setMemberOut(true);
                    }}
                    className="text-gray-400 hover:text-red-400">
                    탈퇴하기
                </button>
            </aside>
            {memberOut && (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" />
                        <div className="w-100 h-80 z-10 bg-pink-100 rounded-lg flex flex-col justify-center items-center">
                            <div className="text-black cursor-pointer ml-60"
                                onClick={() => {
                                    setMemberOut(false);
                                }}>X</div>

                            <div className="flex flex-col mt-10 ml-4 mb-10 text-lg">
                                정말 탈퇴하시겠습니까?

                            </div>
                            <div className="flex flex-row">
                                <button onClick={() => {
                                    deleteUser()
                                    setMemberOut(false);
                                }}
                                    disabled={isPending}
                                    className="mr-2 border-1 w-20 h-8 rounded-lg"
                                >예</button>
                                <button onClick={() => {
                                    setMemberOut(false);
                                }}
                                    className="border-1 border-black w-20 h-8 rounded-lg bg-pink-400 text-white"
                                >아니요</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Sidebar;
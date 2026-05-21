import { Link } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
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

                <button className="text-gray-400 hover:text-red-400">
                    탈퇴하기
                </button>
            </aside>
        </>
    );
};

export default Sidebar;
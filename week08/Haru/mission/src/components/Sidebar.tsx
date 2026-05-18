import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDeleteAccount } from "../hooks/mutations/useDeleteAccount";

interface SidebarProps {
  isOpened: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpened, onClose }: SidebarProps) => {
  const { accessToken } = useAuth();
  const { mutate: deleteAccount, isPending } = useDeleteAccount();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpened) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpened, onClose]);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpened]);

  const handleConfirmDelete = () => {
    deleteAccount();
    setShowConfirmModal(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-[40] transition-opacity duration-300 ease-in-out ${
          isOpened ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-[#121212] border-r border-gray-800 
          transition-transform duration-300 ease-in-out z-[45] shadow-2xl
          ${isOpened ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="flex flex-col p-6 gap-5 h-full">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#FF007A] hover:bg-white/5 rounded-xl font-medium transition-all"
          >
            <span>🏠</span> 홈
          </Link>

          <Link
            to="/my"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#FF007A] hover:bg-white/5 rounded-xl font-medium transition-all"
          >
            <span>👤</span> 마이페이지
          </Link>

          {accessToken && (
            <button
              onClick={() => setShowConfirmModal(true)}
              className="mt-auto mx-4 text-xs text-gray-600 hover:text-red-400 font-medium transition-colors text-left"
            >
              회원 탈퇴하기
            </button>
          )}
        </nav>
      </aside>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center">
          <div className="bg-[#1e1e1e] border border-white/10 rounded-2xl p-8 w-[320px] shadow-2xl">
            <p className="text-white text-center text-base font-medium mb-6">
              정말 탈퇴하시겠습니까?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 bg-[#2a2a2a] hover:bg-[#333] text-white rounded-xl font-medium transition-colors"
              >
                아니오
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isPending}
                className="flex-1 py-3 bg-[#FF007A] hover:bg-[#ff1a87] text-white rounded-xl font-medium transition-colors disabled:opacity-50"
              >
                {isPending ? '처리 중...' : '예'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
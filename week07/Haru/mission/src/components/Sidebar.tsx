import { useState } from 'react'
import { Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../context/AuthContext";
import { useDeleteAccount } from "../hooks/mutations/useDeleteAccount";

const Sidebar = () => {
  const { isOpen, closeSidebar } = useSidebar();
  const { accessToken } = useAuth();
  const { mutate: deleteAccount, isPending } = useDeleteAccount();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleConfirmDelete = () => {
    deleteAccount();
    setShowConfirmModal(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[40]"
          onClick={closeSidebar}
        />
      )}

      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-[#121212] border-r border-gray-800 
        transition-transform duration-300 ease-in-out z-[45] 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col p-6 gap-6 h-full">
          <Link to="/" onClick={closeSidebar} className="hover:text-[#FF007A] text-gray-300 transition-colors">
            🏠 홈
          </Link>
          <Link to="/my" onClick={closeSidebar} className="hover:text-[#FF007A] text-gray-300 transition-colors">
            👤 마이페이지
          </Link>

          {accessToken && (
            <button
              onClick={() => setShowConfirmModal(true)}
              className="mt-auto text-sm text-gray-500 hover:text-red-400 transition-colors text-left"
            >
              탈퇴하기
            </button>
          )}
        </div>
      </aside>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center">
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
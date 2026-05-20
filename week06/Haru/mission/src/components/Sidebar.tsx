import { Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

const Sidebar = () => {
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <>
      {/* 1. 사이드바 외부 영역 (오버레이) */}
      {/* isOpen이 true일 때만 화면 전체를 덮어 외부 클릭을 막고 closeSidebar를 실행합니다. */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-[40]" // 내브바(50)보다 낮고 본체보다 낮게 설정
          onClick={closeSidebar} 
        />
      )}

      {/* 2. 사이드바 본체 */}
      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-[#121212] border-r border-gray-800 
        transition-transform duration-300 ease-in-out z-[45] 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col p-6 gap-6">
          <Link to="/" onClick={closeSidebar} className="hover:text-[#FF007A] text-gray-300 transition-colors">
            🏠 홈
          </Link>
          <Link to="/my" onClick={closeSidebar} className="hover:text-[#FF007A] text-gray-300 transition-colors">
            👤 마이페이지
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
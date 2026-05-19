import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FloatingButton from "../components/FloatingButton";
import LpCreateModal from "../components/LpCreateModal";
import { useAuth } from "../context/AuthContext"; 

const HomeLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { accessToken } = useAuth(); 
  const navigate = useNavigate();

  const handleFloatingButtonClick = () => {
    if (!accessToken) {
      alert("LP를 등록하려면 로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#121212] text-white overflow-hidden">
      <Navbar /> 
      <div className="flex flex-1 w-full overflow-hidden relative">
        <Sidebar /> 
        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide relative">
          <Outlet />
        </main>
      </div>

      <FloatingButton onClick={handleFloatingButtonClick} />

      {isModalOpen && <LpCreateModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default HomeLayout;
// layouts/HomeLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FloatingButton from "../components/FloatingButton";

const HomeLayout = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-[#121212] text-white overflow-hidden">
      
      
      <Navbar /> 

      
      <div className="flex flex-1 w-full overflow-hidden relative">
        
      
        <Sidebar /> 

        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide relative">
          <Outlet />
        </main>

      </div>

      <FloatingButton />
    </div>
  );
};

export default HomeLayout;
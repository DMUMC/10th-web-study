import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import FloatingButton from "../components/FloatingButton";

export default function HomeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 768;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    setIsSidebarOpen(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      <Header onMenuClick={handleToggleSidebar} />

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="사이드바 외부 영역 닫기"
          onClick={handleCloseSidebar}
          className="fixed inset-0 top-[73px] z-30 bg-black/60 md:hidden"
        />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

      <main
        className={`
          min-h-[calc(100dvh-73px)] px-4 py-8 transition-all duration-300 md:px-8
          ${isSidebarOpen ? "md:ml-64" : "md:ml-0"}
        `}
      >
        <Outlet />
      </main>

      <FloatingButton />

      <Footer />
    </div>
  );
}
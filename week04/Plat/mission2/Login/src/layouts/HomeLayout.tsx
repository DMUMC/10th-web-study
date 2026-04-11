import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="flex flex-col h-dvh bg-gray-950">
      <nav className="text-white">네비게이션 바 입니다.</nav>
      <main className="flex-1 text-white">
        <Outlet />
      </main>
      <footer className="text-white">푸터입니다.</footer>
    </div>
  );
}
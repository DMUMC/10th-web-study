import { Outlet, useNavigate } from "react-router-dom"

const HomeLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="h-dvh flex flex-col">
      <nav className="bg-black px-6 py-3 flex items-center justify-between border-b border-gray-800">
        {/* 로고 */}
        <span
          onClick={() => navigate("/")}
          className="text-pink-500 font-bold text-xl cursor-pointer"
          style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
        >
          돌려돌려LP판
        </span>

        {/* 버튼 그룹 */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/login")}
            className="text-white border border-gray-600 px-4 py-1.5 rounded-md text-sm hover:bg-gray-800 transition-colors cursor-pointer"
          >
            로그인
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-pink-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-pink-700 transition-colors cursor-pointer"
          >
            회원가입
          </button>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer />
    </div>
  )
}

export default HomeLayout
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { getMyInfo } from "../apis/auth";
import { QUERY_KEY } from "../constants/key";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  const { accessToken, isLoggingOut, logout } = useAuth();
  const navigate = useNavigate();

  const { data: myInfo } = useQuery({
    queryKey: [QUERY_KEY.my],
    queryFn: getMyInfo,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
    select: (response) => response.data,
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      return;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gray-950/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="사이드바 열기 또는 닫기"
            className="rounded-xl p-1 text-white transition-colors hover:bg-white/10"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M7.95 11.95h32m-32 12h32m-32 12h32"
              />
            </svg>
          </button>

          <Link
            to="/"
            className="text-xl font-bold tracking-tight transition-colors hover:text-purple-400"
          >
            Cat YaOh
          </Link>
        </div>

        <nav className="flex items-center gap-3 text-sm">
          {!accessToken && (
            <>
              <Link
                to="/login"
                className="rounded-lg bg-green-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-green-600"
              >
                로그인
              </Link>

              <Link
                to="/signup"
                className="rounded-lg bg-blue-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-600"
              >
                회원가입
              </Link>
            </>
          )}

          {accessToken && (
            <>
              <span className="hidden text-sm text-gray-200 sm:inline">
                {myInfo?.name ?? "회원"}님 반갑습니다.
              </span>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="rounded-lg bg-red-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-red-600"
              >
                {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
              </button>

              <Link
                to="/my"
                className="rounded-lg bg-purple-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-purple-600"
              >
                마이페이지
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

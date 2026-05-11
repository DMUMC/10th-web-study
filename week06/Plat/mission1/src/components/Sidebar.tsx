import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { accessToken } = useAuth();

  return (
    <aside
      className={`
        fixed left-0 top-[73px] z-40 h-[calc(100dvh-73px)] w-64
        border-r border-white/10 bg-gray-950/95 text-white backdrop-blur-md
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-purple-300">Menu</h2>
            <p className="mt-1 text-xs text-gray-500">Cat YaOh</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="사이드바 닫기"
            className="rounded-lg px-3 py-1 text-xl text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <div className="flex flex-col gap-2 text-sm">
            <Link
              to="/"
              onClick={onClose}
              className="rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
            >
              홈
            </Link>

            <Link
              to="/"
              onClick={onClose}
              className="rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
            >
              LP 목록
            </Link>

            {accessToken && (
              <Link
                to="/my"
                onClick={onClose}
                className="rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
              >
                마이페이지
              </Link>
            )}

            {!accessToken && (
              <>
                <Link
                  to="/login"
                  onClick={onClose}
                  className="rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
                >
                  로그인
                </Link>

                <Link
                  to="/signup"
                  onClick={onClose}
                  className="rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
}
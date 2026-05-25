import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">

      {/* 배경 그라데이션 (은은한 네온 느낌) */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950" />

      {/* 컨텐츠 */}
      <div className="relative z-10 flex flex-col items-center gap-6">

        {/* 404 텍스트 (네온 글로우) */}
        <h1 className="text-7xl font-bold text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-200">
          Page Not Found
        </h2>

        <p className="text-gray-400 text-sm text-center">
          The page you are looking for does not exist
        </p>

        {/* 네온 버튼 */}
        <Link
          to="/"
          className="
            mt-6 px-6 py-3 rounded-xl
            border border-purple-500
            text-purple-300 font-semibold
            transition-all duration-300
            hover:bg-purple-500 hover:text-white
            hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]
          "
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh)] flex-col items-center justify-center bg-gray-950 px-6 text-center text-white">
      
      <h1 className="text-6xl font-bold text-red-500">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        페이지를 찾을 수 없습니다
      </h2>

      <p className="mt-2 text-gray-400">
        요청하신 페이지가 존재하지 않거나 잘못된 경로입니다.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold transition hover:bg-red-500"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
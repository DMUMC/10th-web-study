import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl flex flex-col items-center gap-6 w-[320px]">
        
        {/* 타이틀 */}
        <h1 className="text-2xl font-bold">Welcome</h1>
        <p className="text-sm text-gray-400 text-center">
          Please choose an option below
        </p>

        {/* 버튼 영역 */}
        <div className="flex flex-col gap-3 w-full">
          <Link
            to="/login"
            className="w-full text-center bg-blue-500 hover:bg-blue-600 transition-colors py-2 rounded-lg font-medium"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="w-full text-center bg-purple-500 hover:bg-purple-600 transition-colors py-2 rounded-lg font-medium"
          >
            Sign Up
          </Link>

          <Link
            to="/my"
            className="w-full text-center border border-gray-600 hover:bg-gray-700 transition-colors py-2 rounded-lg font-medium"
          >
            My Page
          </Link>
        </div>
      </div>
    </div>
  );
}
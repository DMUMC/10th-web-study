import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-sm">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="mt-2 text-sm text-gray-400">
          Please choose an option below
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <Link
            to="/login"
            className="w-full rounded-2xl bg-purple-500/20 py-3 font-semibold text-white transition-colors hover:bg-purple-600"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="w-full rounded-2xl border border-white/10 bg-white/10 py-3 font-semibold text-white transition-colors hover:bg-white/15"
          >
            Sign Up
          </Link>

          <Link
            to="/my"
            className="w-full rounded-2xl border border-white/10 bg-purple-500/5 py-3 font-semibold text-gray-300 transition-colors hover:bg-white/10"
          >
            My Page
          </Link>
        </div>
      </div>
    </div>
  );
}
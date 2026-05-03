import { Outlet, Link } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      
      {/* Header */}
      <header className="w-full border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold tracking-tight hover:text-purple-400 transition-colors">
            MyApp
          </Link>

          <nav className="flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-purple-400 transition-colors">
              Home
            </Link>
            <Link to="/login" className="hover:text-purple-400 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="hover:text-purple-400 transition-colors">
              Sign Up
            </Link>
            <Link
              to="/my"
              className="px-3 py-1 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors text-white"
            >
              My Page
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 text-sm text-gray-400 flex justify-between">
          <span>© 2026 MyApp</span>
          <span>Built with React + Tailwind</span>
        </div>
      </footer>
    </div>
  );
}
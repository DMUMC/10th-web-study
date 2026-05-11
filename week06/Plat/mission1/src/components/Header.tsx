import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSearch = () => {

  };

  return (
    <header className="w-full border-b border-white/10 bg-white/5 backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight hover:text-purple-400 transition-colors"
        >
          Spinning Plat
        </Link>

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-48 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-sm text-white placeholder:text-gray-400 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
              />

              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors text-sm text-white"
              >
                Search
              </button>
            </form>
            {!accessToken && (
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-lg bg-green-400 hover:bg-green-500 transition-colors text-sm text-white"
              >
                Login
              </Link>
            )}

            {!accessToken && (
              <Link
                to="/signup"
                className="px-3 py-1.5 rounded-lg bg-blue-400 hover:bg-blue-500 transition-colors text-sm text-white"
              >
                Sign Up
              </Link>
            )}

            {accessToken && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 transition-colors text-sm text-white"
              >
                Logout
              </button>
            )}

            {accessToken && (
              <Link
                to="/my"
                className="px-3 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors text-sm text-white"
              >
                My Page
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
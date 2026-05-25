// src/components/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AutoContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { token, logout } = useAuth();
  const isAuthenticated = !!token;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
            fixed inset-y-0 left-0 z-30 w-56 flex flex-col shrink-0
             bg-neutral-900 border-r border-neutral-800
            transition-transform duration-300 ease-in-out
            pt-16 
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `}
      >
        <nav className="p-4 space-y-2">
          <NavLink
            to="/lps"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md font-medium
              ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-neutral-800 hover:text-white'}`
            }
          >
            찾기 (LP 목록)
          </NavLink>
          
          <NavLink
            to="/mypage"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md font-medium
              ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-neutral-800 hover:text-white'}`
            }
          >
            마이페이지
          </NavLink>
        </nav>
        
        <div className="p-4 mt-auto border-t border-neutral-800 space-y-2">
           {isAuthenticated ? (
             <button
              onClick={() => {
                logout();
              }}
              className="w-full text-center px-4 py-2 rounded-md font-medium text-red-400 bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              로그아웃
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block text-center px-4 py-2 rounded-md font-medium bg-neutral-800 text-gray-300 hover:bg-neutral-700"
              >
                로그인
              </NavLink>
              <NavLink
                to="/signup"
                className="block text-center px-4 py-2 rounded-md font-bold bg-blue-600 text-white hover:bg-blue-700"
              >
                회원가입
              </NavLink>
            </>
          )}
        </div>
      </aside>
    </>
  );
};
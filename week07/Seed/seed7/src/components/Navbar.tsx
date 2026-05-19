import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useGetMyInfo } from '../hooks/queries/useGetMyInfo'
import { useSidebar } from '../context/SidebarContext'
import { useLogout } from '../hooks/diverse/useLogout'

const Navbar = () => {
    const { accessToken } = useAuth()
    const { data: userData } = useGetMyInfo()
    const { toggleSidebar } = useSidebar()
    const { mutate: logout, isPending } = useLogout()

    return (
        <nav className="h-16 bg-[#121212] border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="text-white hover:text-[#FF007A] transition-colors p-2">
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.94971 11.9497H39.9497" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.94971 23.9497H39.9497" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.94971 35.9497H39.9497" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <Link to="/" className="text-[#FF007A] text-xl font-bold">돌려돌려LP판</Link>
            </div>
            <div className="flex items-center gap-6">
                <button className="text-xl text-white">🔍</button>
                {accessToken ? (
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-white">
                            <span className="text-gray-400">{userData?.data?.name || '사용자'}</span>님 반갑습니다.
                        </span>
                        <button
                            onClick={() => logout()}
                            disabled={isPending}
                            className="text-sm text-gray-300 hover:underline disabled:opacity-50"
                        >
                            {isPending ? '처리 중...' : '로그아웃'}
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4 text-white">
                        <Link to="/login" className="text-sm hover:underline">로그인</Link>
                        <Link to="/signup" className="bg-[#FF007A] px-4 py-2 rounded-md text-sm font-bold text-white">회원가입</Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
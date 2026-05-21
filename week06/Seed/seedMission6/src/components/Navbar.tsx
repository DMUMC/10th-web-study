import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import Sidebar from "./Sidevar";
import { is } from "zod/v4/locales";

const Navbar = () => {
    const { accessToken } = useAuth();
    console.log(accessToken);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    }
    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        }
        getData();
    }, [])

    return <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
        <div className="flex items-center justify-between p-4">
            <Sidebar
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <button onClick={() => setIsOpen(!isOpen)}>
                <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M7.95 11.95h32m-32 12h32m-32 12h32" /></svg>
            </button>
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
                돌려돌려LP판
            </Link>

            <div className="space-x-6">
                <Link to={"/search"} className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                    검색
                </Link>
                {!accessToken && (
                    <>
                        <Link to={"/login"} className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                            로그인
                        </Link>
                        <Link to={"/signup"} className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                            회원가입
                        </Link>
                    </>
                )}
                {accessToken && (
                    <>
                        <span> {data?.data?.name}님 환영합니다.</span>
                        <Link to={"/login"} className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                            <button onClick={handleLogout}> 로그아웃</button>
                        </Link>
                    </>
                )}

            </div>

        </div>
    </nav>
}
export default Navbar;
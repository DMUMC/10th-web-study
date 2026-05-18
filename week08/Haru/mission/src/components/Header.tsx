import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { accessToken, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            logout(); 
            navigate("/"); 
        }
    };

    return (
        <header className="p-4 bg-gray-100 flex justify-between items-center">
            <h1 onClick={() => navigate("/")} className="cursor-pointer font-bold">My Service</h1>
            <nav>
                {accessToken ? (
                
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        로그아웃
                    </button>
                ) : (
                    
                    <button 
                        onClick={() => navigate("/login")}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
                        로그인
                    </button>
                )}
            </nav>
        </header>
    );
};

export default Header;
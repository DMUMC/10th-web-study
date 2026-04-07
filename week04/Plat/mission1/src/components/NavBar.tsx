import { NavLink } from "react-router-dom";

const LINKS = [
    { to: "/", label: "홈" },
    { to: "/movies/popular", label: "인기 영화" },
    { to: "/movies/now_playing", label: "현재 상영중" },
    { to: "/movies/upcoming", label: "개봉 예정" },
    { to: "/movies/top_rated", label: "최고 평점" },
]

export default function NavBar() {
    return (
        <div className="flex gap-3 p-4">
            {LINKS.map(({to , label}) => (
                <NavLink 
                    key={to} 
                    to={to} 
                    className={({isActive}) => isActive ? 'text-green-400 font-bold text-gray-5' : 'text-gray-500 hover:text-gray-700'}>
                    {label}
                </NavLink>
            ))}
        </div>
    );
}
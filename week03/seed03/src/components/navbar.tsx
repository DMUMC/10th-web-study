import { Link, NavLink, } from "react-router-dom";

const LINKS = [
    { to: '/', labels: '홈' },
    { to: 'movies/category/popular', labels: '인기 영화' },
    { to: 'movies/category/now_playing', labels: '상영 중' },
    { to: 'movies/category/top_rated', labels: '평점 높은' },
    { to: 'movies/category/upcoming', labels: '개봉 예정' },
]

export const Navbar = () => {
    return (
        <div className="flex gap-3 p-4">
            {LINKS.map(({ to, labels }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) => {
                        return isActive ? 'text-[#b2dab1] font-bold' : 'text-gray-500'
                    }
                    }>
                    {labels}
                </NavLink>
            ))}
        </div>
    );
};

export default Navbar;
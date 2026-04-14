import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <Link to="/">홈 페이지로 이동</Link>
            <Link to="/movies">인기 영화</Link>
            <Link to="/moving">상영 중</Link>
            <Link to="/hightScore">평점 높은</Link>
            <Link to="/scheduled">개봉 예정</Link>
        </nav>
    );
};

export default Navbar;
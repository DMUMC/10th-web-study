import { Outlet } from "react-router-dom";

const HomeLayout = () => {
    return (
        <div className="h-dvh flex flex-col">
            <nav className="HomeLayout__nav p-4">
                <span className="HomeLayout__nav-logo">돌려돌려LP판</span>
                <div className="HomeLayout__nav-btn">
                    <button>로그인</button><button className="member">회원가입</button>
                </div>
            </nav>
            <main className="flex-1 flex items-center justify-center">
                <Outlet />
            </main>
            <footer>푸터</footer>
        </div>
    )
};

export default HomeLayout;
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="mt-20 flex-1 flex items-center justify-center">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
};

export default HomeLayout;
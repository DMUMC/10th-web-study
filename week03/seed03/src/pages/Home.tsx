// src/pages/home.tsx
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";
const HomePage = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
};

export default HomePage;
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 py-6 mt-12">
            <p className="bg-gray-100 dark:bg-gray-900 py-6 mt-12">
                &copy; {new Date().getFullYear()}SpinningSpinning Dolimpan. All rights
            </p>
            <div className="flex justify-center space-x-4 mt-4">
                <Link to={"#"}>Privacy Policy</Link>
                <Link to={"#"}>Privacy Policy</Link>
                <Link to={"#"}>Privacy Policy</Link>
            </div>
        </footer>
    )
};

export default Footer;
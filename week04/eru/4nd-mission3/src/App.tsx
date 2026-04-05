import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFoundPage';
import Login from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import Signup from './pages/SignupPage';
import MyPage from './pages/MyPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "my", element: <MyPage /> },
    ],
  },
]);

function App() {


  return (
    <RouterProvider router={router} />

  )
}

export default App
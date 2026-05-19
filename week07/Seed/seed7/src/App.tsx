// App.tsx
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import HomeLayout from "./Layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import SignupPasswordPage from "./pages/SignupPasswordPage";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";

// ✅ AuthProvider로 감싼 Layout 컴포넌트
const AuthLayout = () => {
  return (
    <AuthProvider>
      <HomeLayout />
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,  // ✅ Router 안에 AuthProvider가 위치
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "signup/password", element: <SignupPasswordPage /> },
      { path: "my", element: <MyPage /> },  // ✅ protectedRoutes도 통합
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> }
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;  // ✅ 깔끔하게 RouterProvider만
}

export default App;
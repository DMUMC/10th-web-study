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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedLayout from "./Layouts/ProtectedLayout";
import LpDetailPage from "./pages/LpDetailPage";

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
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "signup/password", element: <SignupPasswordPage /> },
      { path: "my", element: <MyPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
      { path: "/lp/:lpId", element: <LpDetailPage /> }
    ],
  }
]);



export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    }
  }
});

function App() {
  return (
    < QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>


  );
}

export default App;
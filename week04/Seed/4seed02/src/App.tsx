import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./Layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
//1.홈페이지
//2.로그인 페이지
//3.회원가입 페이지


import SignupPasswordPage from "./pages/SignupPasswordPage"; // ← import 추가

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "signup/password", element: <SignupPasswordPage /> }, // ← SignupPage → SignupPasswordPage
      { path: "my", element: <MyPage /> },
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

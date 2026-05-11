import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef } from "react";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const location = useLocation();
  const isAlertShown = useRef(false);

  useEffect(() => {
    if (!accessToken && !isAlertShown.current) {
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      isAlertShown.current = true;
    }
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
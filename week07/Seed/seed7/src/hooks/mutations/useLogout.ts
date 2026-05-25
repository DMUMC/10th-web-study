import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postLogout } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext";

const useLogout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    return useMutation({
        mutationFn: postLogout,
        onSuccess: () => {
            logout();
            navigate("/login");
        },
        onError: (error) => {
            console.log("로그아웃 실패: ", error);
            alert("로그아웃 실패");
        }
    })
}

export default useLogout;
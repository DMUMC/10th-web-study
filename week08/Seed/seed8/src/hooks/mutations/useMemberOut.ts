import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../apis/auth";

const useMemberOut = () => {
    const navigate = useNavigate();
    // const { logout } = useAuth();
    const { clearAuth } = useAuth();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            // logout();
            clearAuth();
            alert("회원탈퇴 성공");
            navigate("/login");
        },
        onError: () => {
            alert("회원탈퇴 실패");
        }
    })
}

export default useMemberOut;
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RequestSigninDto } from "../types/auth";
import { createContext, PropsWithChildren, useContext } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useState } from "react";
import { deleteUser, postLogout, postSignin } from "../apis/auth";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (signInData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
    // memberOut: () => Promise<void>;
    clearAuth: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => { },
    logout: async () => { },
    // memberOut: async () => { },
    clearAuth: () => { },
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate();
    const {
        getItem: getAccessTokenFromStorage,
        setItem: setAccessTokenInStorage,
        removeItem: removeAccessTokenFromStorage,
    } = useLocalStorage(
        // LOCAL_STORAGE_KEY.refreshToken);
        LOCAL_STORAGE_KEY.accessToken);

    const {
        getItem: getRefreshTokenFromStorage,
        setItem: setRefreshTokenInStorage,
        removeItem: removeRefreshTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFromStorage(),
    )
    const [refreshToken, setRefreshToken] = useState<string | null>(
        getRefreshTokenFromStorage(),
    )
    const login = async (signinData: RequestSigninDto) => {
        try {
            const response = await postSignin(signinData);
            if (response.data) {
                const newAccessToken = response.data.accessToken;
                const newRefreshToken = response.data.refreshToken;

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);
                alert("로그인 성공");
            }
        } catch (error) {
            console.error("로그인 오류", error);
            alert("로그인 실패");
        }
    };

    const logout = async () => {
        try {
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();

            setAccessToken(null);
            setRefreshToken(null);

            alert("로그아웃 성공");
            // navigate("/");
        } catch (error) {
            console.log("로그아웃 오류", error);
            alert("로그아웃 실패");
        }
    };

    // const memberOut = async () => {
    //     try {
    //         await deleteUser();
    //         removeAccessTokenFromStorage();
    //         removeRefreshTokenFromStorage();

    //         setAccessToken(null);
    //         setRefreshToken(null);

    //         alert("회원탈퇴 성공");
    //         navigate("/login");
    //     } catch (error) {
    //         console.log("회원탈퇴 오류", error);
    //         alert("회원탈퇴 실패");
    //     }
    // };
    const clearAuth = () => {
        removeAccessTokenFromStorage();
        removeRefreshTokenFromStorage();
        setAccessToken(null);
        setRefreshToken(null);
    }


    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout, clearAuth }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext를 찾을 수 없습니다.");
    }
    return context
}
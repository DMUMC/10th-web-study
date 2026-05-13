import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postSignin, postLogout } from "../apis/auth";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (signinData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},    
});

export const AuthProvider = ({children}:PropsWithChildren) => {
    const { 
        getItem: getAccessTokenFormStorage, 
        setItem: setAccessTokenInStorage, 
        removeItem: removeAccessTokenFromStroage, 
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const {
        getItem: getRefreshTokenFormStorage,
        setItem: setRefreshTokenInStorage,
        removeItem: removeRefreshTokenFromStroage, 
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFormStorage(),
    )
    const [refreshToken, setRefreshToken] = useState<string | null>(
        getRefreshTokenFormStorage(),
    )

    const login = async (signinData: RequestSigninDto) => {
        try{
            const { data } = await postSignin(signinData);

            if(data){
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);
            }
            window.location.href='my';
        } catch (error) {
            console.error("Login Error", error);
            alert("Login Failed");
        }
    }

    const logout = async () => {
        try {
            await postLogout();
            removeAccessTokenFromStroage();
            removeRefreshTokenFromStroage();

            setAccessToken(null);
            setRefreshToken(null);

            alert("Logout Successs");
        } catch(error) {
            console.log("Logout Error", error);
            alert("Logout Failed");
        }
    }

    return (
        <AuthContext.Provider value={{accessToken, refreshToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if(!context){
        throw new Error("Not Found AuthContext");
    }

    return context;
}
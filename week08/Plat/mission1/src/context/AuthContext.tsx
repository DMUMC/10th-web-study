/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type PropsWithChildren } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { deleteMyAccount, postLogout, postSignin } from "../apis/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signinData: RequestSigninDto, redirectPath?: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isDeletingAccount: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
  deleteAccount: async () => {},
  isLoggingIn: false,
  isLoggingOut: false,
  isDeletingAccount: false,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  const clearAuth = () => {
    removeAccessTokenFromStorage();
    removeRefreshTokenFromStorage();
    setAccessToken(null);
    setRefreshToken(null);
    queryClient.clear();
  };

  const signinMutation = useMutation({
    mutationFn: postSignin,
  });

  const logoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: clearAuth,
  });

  const deleteAccountMutation = useMutation({
    mutationFn: deleteMyAccount,
    onSuccess: clearAuth,
  });

  const login = async (
    signinData: RequestSigninDto,
    redirectPath: string = "/"
  ) => {
    try {
      const { data } = await signinMutation.mutateAsync(signinData);

      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);
      }

      window.location.href = redirectPath;
    } catch (error) {
      console.error("Login Error", error);
      alert("Login Failed");
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.log("Logout Error", error);
      alert("Logout Failed");
      throw error;
    }
  };

  const deleteAccount = async () => {
    try {
      await deleteAccountMutation.mutateAsync();
    } catch (error) {
      console.log("Delete Account Error", error);
      alert("회원 탈퇴에 실패했습니다.");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        login,
        logout,
        deleteAccount,
        isLoggingIn: signinMutation.isPending,
        isLoggingOut: logoutMutation.isPending,
        isDeletingAccount: deleteAccountMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Not Found AuthContext");
  }

  return context;
};

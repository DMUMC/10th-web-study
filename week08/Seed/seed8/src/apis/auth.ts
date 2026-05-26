import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { RequestSignupDto, RequestSigninDto, ResponseSignupDto, ResponseSigninDto, ResponseMyInfoDto } from "../types/auth.ts";
import { axiosInstance } from "./axios.ts";

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
    const { data } = await axiosInstance.post(
        '/v1/auth/signup', body,
    );

    return data;
};

export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
    const response = await axiosInstance.post(
        "/v1/auth/signin",
        body,
    );

    return response.data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    const { data } = await axiosInstance.get("/v1/users/me");


    return data;
};

export const postLogout = async () => {
    const { data } = await axiosInstance.post("/v1/auth/signout");

    return data;
}


//회원정보 수정
export const patchMyInfo = async (
    body: {
        name?: string;
        bio?: string
    }) => {
    const response = await axiosInstance.patch("/v1/users", body);
    return response.data;
}


export const deleteUser = async () => {
    const { data } = await axiosInstance.delete("/v1/users");
    return data;
}
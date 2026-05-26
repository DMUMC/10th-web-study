import { RequestSigninDto, RequestSignupDto, ResponseSignupDto, ResponseSigninDto, ResponseMyInfoDto } from "../types/auth";
import { axiosInstance } from "./axios.ts";

//구조분해할당
//프로미스 타입이라 axios와 await을 같이 써야함
export const postSignup = async (
    body: RequestSignupDto
): Promise<ResponseSignupDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signup", body);
    return data;
};


export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signin", body);
    return data;
};



export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    const { data } = await axiosInstance.get("/v1/users/me", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
    })
    return data;
};
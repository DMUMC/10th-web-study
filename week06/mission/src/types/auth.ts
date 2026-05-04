import type { CommonResponse } from "./common";

export type RequestSignupDto = {
    name:string;
    email: string;
    bio?:string;
    avatar?:string;
    password:string;
}

export type ResponseSingupDto = CommonResponse<{
    id: number;
    name:string;
    email:string;
    bio:string | null;
    avatar: string | null;
    createdAt: Date;
    updateAt: Date;
}>;

export type RequestSigninDto = {
    email: string;
    password: string;
}

export type ResponseSigninDto = CommonResponse<{
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
}>

export type ResponseMyInfoDto = CommonResponse<{
    id: number;
    name:string;
    email:string;
    bio:string | null;
    avator: string | null;
    createdAt: Date;
    updateAt: Date;
}>;
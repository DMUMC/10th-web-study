import { UserSigninInformation, validateSignin } from "../utils/validate";
import useForm from "../hooks/useForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
// import LoginTypeButton from "../components/LoginTypeButton";

// const handleGoogleLogin = () => {
//     const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
//     const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

//     window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
// };


const LoginPage = () => {
    const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

    const { values, errors, touched, getInputProps } =
        useForm<UserSigninInformation>({
            initialValue: {
                email: "",
                password: "",
            },
            validate: validateSignin,
        });

    const handleSubmit = async () => {
        console.log(values);
        try {
            const response = await postSignin(values);
            setItem(response.data.accessToken);
            console.log(response);
        } catch (error) {
            alert(error?.message);
        }

    };

    //오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
    const isDisabled =
        Object.values(errors || {}).some((error) => error.length > 0) || //오류가 있으면 true
        Object.values(values).some((value) => value === ""); //입력값이 비어있으면 True

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    return <div className="LoginPage flex flex-col items-center justify-center h-full gap-4">
        <div className="flex flex-col gap-3">
            <div className="LoginPage__header">
                <button onClick={handleBack}>&lt;</button>로그인
            </div>
            {/* <LoginTypeButton type="google" onClick={handleGoogleLogin} /> */}
            <input
                {...getInputProps('email')}
                name="email"
                className={`border border-[#ccc] w-[300px] p-[10px] focu:border-#807ff] rounded-sm 
                ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type={"email"}
                placeholder="이메일" />
            {errors?.email && touched?.email && (
                <div className="text-red-500 text-sm">이메일 에러</div>
            )}
            <input
                {...getInputProps('password')}
                className={`border border-[#ccc] w-[300px] p-[10px] focu:border-#807ff] rounded-sm 
                ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type={"password"}
                placeholder="비밀번호" />
            {errors?.password && touched?.password && (
                <div className="text-red-500 text-sm">비밀번호 에러</div>
            )}
            <button type="button" onClick={handleSubmit} disabled={isDisabled}
                className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-700 transition-colors cursor-pointer disabled:bg-gray-300">
                로그인
            </button>
        </div>
    </div>;
};

export default LoginPage;
import { UserSigninInformation, validateSignin } from "../utils/validate";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { postSignin } from "../apis/auth.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";

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
            // if (response && response.data)
            setItem(response.data.accessToken);
            console.log(response);
        } catch (error: any) {
            // console.error("Login Error:", error);
            const errorMessage = error?.response?.data?.message || error?.message || "로그인에 실패했습니다.";
            alert(errorMessage);;
        }
    };

    //오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
    const isDisabled =
        Object.values(errors || {}).some((error) => error.length > 0) || //오류가 있으면 true
        Object.values(values).some((value) => value === ""); //입력값이 비어있으면 True

    const navigage = useNavigate();
    const handleBack = () => {
        navigage(-1);
    };

    return <div className="LoginPage flex flex-col items-center justify-center h-full gap-4">
        <div className="flex flex-col gap-3">
            <div className="LoginPage__header">
                <button onClick={handleBack}>&lt;</button>로그인
            </div>
            <input
                {...getInputProps('email')}
                name="email"
                className={`border border-[#ccc] w-[300px] p-[10px] focu:border-[#807ff] rounded-sm 
                ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type={"email"}
                placeholder="이메일" />
            {errors?.email && touched?.email && (
                <div className="text-red-500 text-sm">이메일 에러</div>
            )}
            <input
                {...getInputProps('password')}
                className={`border border-[#ccc] w-[300px] p-[10px] focu:border-[#807ff] rounded-sm 
                ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type={"password"}
                placeholder="비밀번호" />
            {errors?.password && touched?.password && (
                <div className="text-red-500 text-sm">비밀번호 에러</div>
            )}
            <button type="button" onClick={handleSubmit} disabled={isDisabled}
                className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300">로그인</button>
        </div>
    </div>;
};

export default LoginPage;
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { postSignin } from "../apis/auth";
import useLocalStorage from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const schema = z.object({
    email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
    password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
});

type FormFields = z.infer<typeof schema>;

const Login = () => {
    const navigate = useNavigate();
    const { setValue: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken, "");
    const { setValue: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken, "");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<FormFields>({
        defaultValues: { email: "", password: "" },
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (data: FormFields) => {
        try {
            const response = await postSignin(data);
            setAccessToken(response.data.accessToken);
            setRefreshToken(response.data.refreshToken);
            navigate("/");
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message || "로그인에 실패했습니다.");
            } else {
                alert("로그인에 실패했습니다.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full bg-black">
            {/* 헤더 */}
            <div className="flex items-center w-[300px] mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="text-white text-xl cursor-pointer mr-4"
                >
                    {"<"}
                </button>
                <span className="text-white text-lg font-semibold">로그인</span>
            </div>

            <div className="flex flex-col gap-3 w-[300px]">
                {/* 구글 로그인 버튼 */}
                <button className="flex items-center justify-center gap-3 border border-gray-500 rounded-md py-2 text-white bg-black hover:bg-gray-900 transition-colors cursor-pointer">
                    <svg width="20" height="20" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.09-6.09C34.46 3.09 29.5 1 24 1 14.82 1 7.07 6.48 3.64 14.22l7.1 5.52C12.4 13.67 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.52 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.7c-.55 2.99-2.2 5.52-4.68 7.22l7.18 5.58C43.36 37.26 46.52 31.36 46.52 24.5z"/>
                        <path fill="#FBBC05" d="M10.74 28.26A14.6 14.6 0 0 1 9.5 24c0-1.48.25-2.91.74-4.26l-7.1-5.52A23.93 23.93 0 0 0 0 24c0 3.86.92 7.51 2.56 10.74l8.18-6.48z"/>
                        <path fill="#34A853" d="M24 47c5.5 0 10.12-1.82 13.5-4.95l-7.18-5.58C28.6 37.9 26.42 38.5 24 38.5c-6.26 0-11.6-4.17-13.26-9.74l-8.18 6.48C6.07 43.52 14.44 47 24 47z"/>
                    </svg>
                    구글 로그인
                </button>

                {/* OR 구분선 */}
                <div className="flex items-center gap-3 my-1">
                    <div className="flex-1 h-px bg-gray-600" />
                    <span className="text-gray-400 text-sm">OR</span>
                    <div className="flex-1 h-px bg-gray-600" />
                </div>

                {/* 이메일 입력 */}
                <input
                    {...register("email")}
                    className={`bg-black text-white border w-full p-[10px] focus:outline-none focus:border-[#807bff] rounded-sm
                        ${errors.email ? "border-red-500" : "border-gray-600"}`}
                    type="email"
                    placeholder="이메일을 입력해주세요!"
                />
                {errors.email && (
                    <div className="text-red-500 text-sm -mt-2">{errors.email.message}</div>
                )}

                {/* 비밀번호 입력 */}
                <input
                    {...register("password")}
                    className={`bg-black text-white border w-full p-[10px] focus:outline-none focus:border-[#807bff] rounded-sm
                        ${errors.password ? "border-red-500" : "border-gray-600"}`}
                    type="password"
                    placeholder="비밀번호를 입력해주세요!"
                />
                {errors.password && (
                    <div className="text-red-500 text-sm -mt-2">{errors.password.message}</div>
                )}

                {/* 로그인 버튼 */}
                <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={!isValid || isSubmitting}
                    className="w-full bg-pink-600 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed mt-1"
                >
                    로그인
                </button>
            </div>
        </div>
    );
};

export default Login;
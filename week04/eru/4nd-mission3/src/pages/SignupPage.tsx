import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { postSignup } from "../apis/auth";
import useLocalStorage from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const schema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z.string()
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
  passwordCheck: z.string()
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
  name: z.string().min(1, { message: "이름(닉네임)을 입력해주세요." })
}).refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"],
});

type FormFields = z.infer<typeof schema>;

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { setValue: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken, "");
  const { setValue: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken, "");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const { register, handleSubmit, trigger, watch, formState: { errors, isSubmitting } } = useForm<FormFields>({
    defaultValues: { name: "", email: "", password: "", passwordCheck: "" },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const values = watch();

  const isStep1Valid = !!values.email && !errors.email;
  const isStep2Valid = !!values.password && !!values.passwordCheck && !errors.password && !errors.passwordCheck && values.password === values.passwordCheck;
  const isStep3Valid = !!values.name && !errors.name;

  const inputBaseStyle = `text-white border p-[10px] focus:border-[#A0E9FF] rounded-sm bg-transparent outline-none w-full`;

  const getBtnStyle = (isValid: boolean) =>
    `w-full py-3 rounded-md text-lg font-medium mt-2 transition-colors ${isValid ? "bg-pink-600 cursor-pointer hover:bg-pink-700" : "bg-[#333] text-gray-500 cursor-not-allowed"}`;

  const handleNextStep = async (fields: (keyof FormFields)[]) => {
    if (await trigger(fields)) setStep((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordCheck, ...rest } = data;
      const response = await postSignup(rest);
      // 회원가입 후 바로 토큰이 오는 경우 저장 (API 응답에 따라 다를 수 있음)
      if (response.data && "accessToken" in response.data) {
        setAccessToken((response.data as { accessToken: string }).accessToken);
      }
      if (response.data && "refreshToken" in response.data) {
        setRefreshToken((response.data as { refreshToken: string }).refreshToken);
      }
      alert("회원가입 완료!");
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || "실패했습니다.");
      } else {
        alert("실패했습니다.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-black text-white">
      {/* 헤더 */}
      <div className="flex items-center w-[300px] mb-6">
        <button
          onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
          className="text-white text-xl cursor-pointer mr-4"
        >
          {"<"}
        </button>
        <span className="text-lg font-semibold">회원가입</span>
      </div>

      <div className="flex flex-col gap-3 w-[300px]">

        {/* 1단계: 구글 로그인 + OR + 이메일 */}
        {step === 1 && (
          <>
            <button className="flex items-center justify-center gap-3 border border-gray-500 rounded-md py-2 text-white bg-black hover:bg-gray-900 transition-colors cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.09-6.09C34.46 3.09 29.5 1 24 1 14.82 1 7.07 6.48 3.64 14.22l7.1 5.52C12.4 13.67 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.52 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.7c-.55 2.99-2.2 5.52-4.68 7.22l7.18 5.58C43.36 37.26 46.52 31.36 46.52 24.5z"/>
                <path fill="#FBBC05" d="M10.74 28.26A14.6 14.6 0 0 1 9.5 24c0-1.48.25-2.91.74-4.26l-7.1-5.52A23.93 23.93 0 0 0 0 24c0 3.86.92 7.51 2.56 10.74l8.18-6.48z"/>
                <path fill="#34A853" d="M24 47c5.5 0 10.12-1.82 13.5-4.95l-7.18-5.58C28.6 37.9 26.42 38.5 24 38.5c-6.26 0-11.6-4.17-13.26-9.74l-8.18 6.48C6.07 43.52 14.44 47 24 47z"/>
              </svg>
              구글 로그인
            </button>

            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-gray-600" />
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-600" />
            </div>

            <input
              {...register("email")}
              className={`${inputBaseStyle} ${errors.email ? "border-red-500" : "border-[#ccc]"}`}
              type="email"
              placeholder="이메일"
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}
            <button
              type="button"
              onClick={() => handleNextStep(["email"])}
              className={getBtnStyle(isStep1Valid)}
            >
              다음
            </button>
          </>
        )}

        {/* 2단계: 비밀번호 & 확인 */}
        {step === 2 && (
          <>
            <div className="flex items-center gap-2 mb-2 text-gray-300 text-sm">
              <span>✉️</span>
              <span className="text-white">{values.email}</span>
            </div>
            <div className="relative">
              <input
                {...register("password")}
                className={`${inputBaseStyle} ${errors.password ? "border-red-500" : "border-[#ccc]"} pr-10`}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요!"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                )}
              </button>
            </div>
            <div className="relative">
              <input
                {...register("passwordCheck")}
                className={`${inputBaseStyle} ${errors.passwordCheck ? "border-red-500" : "border-[#ccc]"} pr-10`}
                type={showPasswordCheck ? "text" : "password"}
                placeholder="비밀번호를 다시 한 번 입력해주세요!"
              />
              <button
                type="button"
                onClick={() => setShowPasswordCheck((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPasswordCheck ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                )}
              </button>
            </div>
            {(errors.password || errors.passwordCheck) && (
              <div className="text-red-500 text-sm">{errors.password?.message || errors.passwordCheck?.message}</div>
            )}
            <button
              type="button"
              onClick={() => handleNextStep(["password", "passwordCheck"])}
              className={getBtnStyle(isStep2Valid)}
            >
              다음
            </button>
          </>
        )}

        {/* 3단계: 닉네임 */}
        {step === 3 && (
          <>
            <div className="flex justify-center items-center w-full">
              <div className="w-[200px] h-[200px] rounded-full bg-gray-700 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
            </div>
            <input
              {...register("name")}
              className={`${inputBaseStyle} ${errors.name ? "border-red-500" : "border-[#ccc]"}`}
              type="text"
              placeholder="닉네임을 입력해주세요!"
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}
            <button
              disabled={isSubmitting || !isStep3Valid}
              type="button"
              onClick={handleSubmit(onSubmit)}
              className={getBtnStyle(isStep3Valid)}
            >
              회원가입 완료
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
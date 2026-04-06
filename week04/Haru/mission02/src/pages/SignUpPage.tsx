import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import z from 'zod'
import { postSignup } from '../apis/auth'

const schema = z.object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다" }),
    password: z.string().min(6, { message: "비밀번호는 6자 이상이어야 합니다." }).max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
    passwordCheck: z.string(),
    name: z.string().min(1, { message: "닉네임을 입력해주세요." })
}).refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"]
})

type FormFields = z.infer<typeof schema>

const SignUpPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const {
        register,
        handleSubmit,
        trigger,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm<FormFields>({
        defaultValues: { name: "", email: "", password: "", passwordCheck: "" },
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    const emailValue = watch("email");

    const nextStep = async (e: React.MouseEvent) => {
        e.preventDefault(); // 버튼 클릭 시 폼 제출 방지
        let fields: (keyof FormFields)[] = [];
        if (step === 1) fields = ["email"];
        else if (step === 2) fields = ["password", "passwordCheck"];

        const result = await trigger(fields);
        if (result) setStep((prev) => prev + 1);
    }

    const prevStep = (e: React.MouseEvent) => {
        e.preventDefault();
        if (step === 1) navigate(-1);
        else setStep((prev) => prev - 1);
    }

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const { passwordCheck, ...rest } = data;
            const response = await postSignup(rest);
            
      
            if (response) {
                const resData = response.data as any;
                const token = resData?.accessToken || resData?.token;
                
                if (token) {
                    localStorage.setItem('accessToken', token);
                }
                // 마이페이지로 이동
                navigate('/');
            }
        } catch (error: any) {
            alert(error.response?.data?.message || "회원가입 실패");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-white text-black p-6">
            <div className="w-full max-w-[400px]">
                <div className="relative flex items-center justify-center mb-10 w-full">
                    <button type="button" onClick={prevStep} className="absolute left-0 text-2xl text-gray-600 hover:text-black">&lt;</button>
                    <h1 className="text-xl font-bold">회원가입</h1>
                </div>

                {/* handleSubmit이 여기서 호출됩니다 */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {step === 1 && (
                        <div>
                            <input
                                {...register("email")}
                                className={`w-full p-4 bg-white border rounded-xl text-black placeholder:text-gray-500 focus:outline-none ${errors.email ? 'border-red-500' : 'border-black/10'}`}
                                type="email"
                                placeholder="email"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                    )}

                    {step === 2 && (
                        <>
                            <div className="text-sm text-gray-600 mb-2 pl-1">✉️ {emailValue}</div>
                            <div className="space-y-4">
                                <input
                                    {...register("password")}
                                    className={`w-full p-4 bg-white border rounded-xl text-black focus:outline-none ${errors.password ? 'border-red-500' : 'border-black/10'}`}
                                    type="password"
                                    placeholder="password"
                                />
                                <input
                                    {...register("passwordCheck")}
                                    className={`w-full p-4 bg-white border rounded-xl text-black focus:outline-none ${errors.passwordCheck ? 'border-red-500' : 'border-black/10'}`}
                                    type="password"
                                    placeholder="passwordCheck"
                                />
                                {(errors.password || errors.passwordCheck) && <p className="text-red-500 text-sm mt-1">{errors.password?.message || errors.passwordCheck?.message}</p>}
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col items-center space-y-6">
                            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                            </div>
                            <input
                                {...register("name")}
                                className={`w-full p-4 bg-white border rounded-xl text-black focus:outline-none ${errors.name ? 'border-red-500' : 'border-black/10'}`}
                                type="text"
                                placeholder="nickname"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>
                    )}

                    {step < 3 ? (
                        <button 
                            type="button" 
                            onClick={nextStep} 
                            className="w-full py-4 mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg"
                        >
                            다음
                        </button>
                    ) : (
                        <button 
                            type="submit" 
                            disabled={isSubmitting || !isValid} 
                            className="w-full py-4 mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg disabled:bg-gray-300"
                        >
                            회원가입 완료
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default SignUpPage
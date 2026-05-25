import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { postSignup } from "../apis/auth";

const schema = z.object({
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
    password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다." }).max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z.string(),
}).refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
});

type FormFields = z.infer<typeof schema>;

const SignupPasswordPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email as string; // SignupPage에서 넘어온 이메일

    // 이메일 없이 직접 접근하면 첫 페이지로 돌려보냄


    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({
        resolver: zodResolver(schema),
        mode: "onBlur",
    });

    if (!email) {
        navigate("/signup");
        return null;
    }

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const { passwordCheck, ...rest } = data;
        try {
            await postSignup({ email, ...rest });
            navigate("/login"); // 가입 완료 후 로그인 페이지로
        } catch (error: any) {
            if (error.response?.status === 409) {
                alert("이미 사용 중인 이메일입니다.");
                navigate("/signup"); // 이메일 입력으로 돌아가기
            } else {
                alert("회원가입에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold">비밀번호 설정</h2>
                {/* 이전 단계 이메일 표시 */}
                <p className="text-sm text-gray-500">{email}</p>
                <input
                    {...register("name")}
                    type="text"
                    placeholder="이름"
                    className={`border w-[300px] p-[10px] rounded-sm
                        ${errors.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                />
                {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}
                <input
                    {...register("password")}
                    type="password"
                    placeholder="비밀번호"
                    className={`border w-[300px] p-[10px] rounded-sm
                        ${errors.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                />
                {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}
                <input
                    {...register("passwordCheck")}
                    type="password"
                    placeholder="비밀번호 확인"
                    className={`border w-[300px] p-[10px] rounded-sm
                        ${errors.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                />
                {errors.passwordCheck && <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>}
                <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit(onSubmit)}
                    className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
                >
                    회원가입
                </button>
            </div>
        </div>
    );
};

export default SignupPasswordPage;
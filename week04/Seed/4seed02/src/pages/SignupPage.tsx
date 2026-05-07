import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const schema = z.object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
});

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(schema),
        mode: "onBlur",
    });

    const onSubmit = (data: FormFields) => {
        navigate("/signup/password", { state: { email: data.email } });
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold">회원가입</h2>
                <input
                    {...register("email")}
                    type="email"
                    placeholder="이메일"
                    className={`border w-[300px] p-[10px] rounded-sm
                        ${errors.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                />
                {errors.email && (
                    <div className="text-red-500 text-sm">{errors.email.message}</div>
                )}
                <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default SignupPage;
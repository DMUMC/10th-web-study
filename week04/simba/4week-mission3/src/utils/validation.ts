import { z } from 'zod';
export interface UserSigninInformation {
    email: string;
    password: string;
}

export const validateSignin = (values: UserSigninInformation) => {
    const errors: Partial<UserSigninInformation> = {};

    if (!values.email) {
        errors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!values.password) {
        errors.password = '비밀번호를 입력해주세요.';
    } else if (values.password.length < 6) {
        errors.password = '비밀번호는 6자 이상이어야 합니다.';
    }

    return errors;
};
export const signupSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
  password: z.string().min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
  confirmPassword: z.string().min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
  nickname: z.string().min(2, { message: "닉네임은 2자 이상 입력해주세요." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"],
});

export type SignupFormData = z.infer<typeof signupSchema>;
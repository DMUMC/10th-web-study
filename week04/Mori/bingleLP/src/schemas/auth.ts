import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { z } from 'zod'

export const PASSWORD_MIN_LENGTH = 6
export const EMAIL_ERROR = '유효하지 않은 이메일 형식입니다.'
export const PASSWORD_ERROR = '비밀번호는 최소 6자 이상이어야 합니다.'
export const PASSWORD_MISMATCH = '비밀번호가 일치하지 않습니다.'
export const NICKNAME_ERROR = '닉네임을 입력해주세요.'

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, '이메일을 입력해주세요!')
    .email({ message: EMAIL_ERROR }),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, { message: PASSWORD_ERROR }),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>

export const signupEmailFieldSchema = z.object({
  email: loginFormSchema.shape.email,
})

export const passwordPairSchema = z
  .object({
    password: z.string().min(PASSWORD_MIN_LENGTH, { message: PASSWORD_ERROR }),
    passwordConfirm: z
      .string()
      .min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((d) => d.password === d.passwordConfirm, {
    path: ['passwordConfirm'],
    message: PASSWORD_MISMATCH,
  })

export const signupPasswordFieldsSchema = passwordPairSchema

export const signupNicknameFieldSchema = z.object({
  nickname: z.string().trim().min(1, { message: NICKNAME_ERROR }),
})

export const signupFormSchema = passwordPairSchema.extend({
    email: loginFormSchema.shape.email,
    nickname: z.string().trim().min(1, { message: NICKNAME_ERROR }),
  })

export type SignupFormValues = z.infer<typeof signupFormSchema>

/** 회원가입 API 호출에 쓰이는 페이로드 타입 */
export type SignupSubmitPayload = {
  email: string
  password: string
  nickname: string
}

export function applyZodFieldErrors<T extends FieldValues>(
  setError: UseFormSetError<T>,
  zodError: z.ZodError,
) {
  const fieldErrors = zodError.flatten().fieldErrors
  for (const key of Object.keys(fieldErrors)) {
    const messages = fieldErrors[key as keyof typeof fieldErrors]
    const msg = messages?.[0]
    if (msg) setError(key as Path<T>, { type: 'manual', message: msg })
  }
}

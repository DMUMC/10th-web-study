import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { AuthSocialButton } from '../components/auth/AuthSocialButton'
import { loginFormSchema, type LoginFormValues } from '../schemas/auth'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, startGoogleLogin } = useAuth()
  const [apiError, setApiError] = useState<string | undefined>()
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  })

  function handleBack() {
    navigate(-1)
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col items-center justify-center bg-black px-4 py-10">
      <div className="flex w-full max-w-xs flex-col gap-6">
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={handleBack}
            className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-zinc-800"
            aria-label="뒤로 가기"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold text-white">로그인</h1>
        </div>

        <AuthSocialButton
          onClick={startGoogleLogin}
          label="Google 계정으로 로그인"
        />

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-700" />
          <span className="text-xs font-normal tracking-wider text-zinc-500">
            OR
          </span>
          <div className="h-px flex-1 bg-zinc-700" />
        </div>

        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(async (values) => {
            setApiError(undefined)
            setSubmitting(true)
            try {
              await login(values.email, values.password)
              navigate('/')
            } catch (err) {
              setApiError(
                err instanceof Error
                  ? err.message
                  : '로그인에 실패했습니다.',
              )
            } finally {
              setSubmitting(false)
            }
          })}
          noValidate
        >
          <div className="flex flex-col gap-1.5">
            <input
              type="email"
              autoComplete="email"
              placeholder="이메일을 입력해주세요!"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full rounded-lg border bg-zinc-800 px-4 py-3 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:ring-1 ${
                errors.email
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                  : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500'
              }`}
              {...register('email')}
            />
            {errors.email ? (
              <p
                id="email-error"
                role="alert"
                className="text-left text-sm text-red-400"
              >
                {errors.email.message}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-1.5">
            <input
              type="password"
              autoComplete="current-password"
              placeholder="비밀번호를 입력해주세요!"
              aria-invalid={errors.password ? true : undefined}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={`w-full rounded-lg border bg-zinc-800 px-4 py-3 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:ring-1 ${
                errors.password
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                  : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500'
              }`}
              {...register('password')}
            />
            {errors.password ? (
              <p
                id="password-error"
                role="alert"
                className="text-left text-sm text-red-400"
              >
                {errors.password.message}
              </p>
            ) : null}
          </div>
          {apiError ? (
            <p role="alert" className="text-left text-sm text-red-400">
              {apiError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={!isValid || submitting}
            className="mt-2 w-full rounded-lg bg-zinc-800 py-3 text-[15px] font-bold text-zinc-500 transition duration-300 enabled:bg-main-pink enabled:text-white disabled:cursor-not-allowed"
          >
            {submitting ? '로그인 중…' : '로그인'}
          </button>
        </form>
      </div>
    </main>
  )
}

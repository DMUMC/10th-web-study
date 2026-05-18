import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useLoginMutation } from '../queries/authMutations'
import { AuthInput } from '../components/auth/AuthInput'
import { AuthSocialButton } from '../components/auth/AuthSocialButton'
import { loginFormSchema, type LoginFormValues } from '../schemas/auth'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { startGoogleLogin } = useAuth()
  const loginMutation = useLoginMutation()
  const [apiError, setApiError] = useState<string | undefined>(
    (location.state as { oauthError?: string } | null)?.oauthError,
  )

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
          onSubmit={handleSubmit((values) => {
            setApiError(undefined)
            loginMutation.mutate(
              { email: values.email, password: values.password },
              {
                onError: (err) => {
                  setApiError(
                    err instanceof Error
                      ? err.message
                      : '로그인에 실패했습니다.',
                  )
                },
              },
            )
          })}
          noValidate
        >
          <AuthInput
            type="email"
            autoComplete="email"
            placeholder="이메일을 입력해주세요!"
            error={errors.email?.message}
            errorId="email-error"
            registration={register('email')}
          />
          <AuthInput
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호를 입력해주세요!"
            error={errors.password?.message}
            errorId="password-error"
            registration={register('password')}
          />
          {apiError ? (
            <p role="alert" className="text-left text-sm text-red-400">
              {apiError}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={!isValid || loginMutation.isPending}
            className="mt-2 w-full rounded-lg bg-zinc-800 py-3 text-[15px] font-bold text-zinc-500 transition duration-300 enabled:bg-main-pink enabled:text-white disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? '로그인 중…' : '로그인'}
          </button>
        </form>
      </div>
    </main>
  )
}

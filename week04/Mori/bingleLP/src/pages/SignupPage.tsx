import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Mail } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { AuthSocialButton } from '../components/auth/AuthSocialButton'
import {
  applyZodFieldErrors,
  signupEmailFieldSchema,
  signupFormSchema,
  signupNicknameFieldSchema,
  signupPasswordFieldsSchema,
  type SignupFormValues,
  type SignupSubmitPayload,
} from '../schemas/auth'

type SignupStep = 1 | 2 | 3

/** 폼 제출 시 `preventDefault`만 필요할 때 `FormEvent` 대신 사용 */
type FormSubmitLike = { preventDefault(): void }

export function SignupPage() {
  const navigate = useNavigate()
  const { signup, startGoogleLogin } = useAuth()
  const [step, setStep] = useState<SignupStep>(1)
  const [showPw, setShowPw] = useState(false)
  const [showPw2, setShowPw2] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | undefined>()

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
    },
    mode: 'onBlur',
  })

  const w = watch()
  const canStep1 = signupEmailFieldSchema.safeParse({ email: w.email }).success
  const canStep2 = signupPasswordFieldsSchema.safeParse({
    password: w.password,
    passwordConfirm: w.passwordConfirm,
  }).success
  const canStep3 = signupNicknameFieldSchema.safeParse({
    nickname: w.nickname,
  }).success

  function handleBack() {
    if (step === 1) navigate(-1)
    else if (step === 2) setStep(1)
    else setStep(2)
  }

  function onStep1Next(e: FormSubmitLike) {
    e.preventDefault()
    clearErrors('email')
    const parsed = signupEmailFieldSchema.safeParse({ email: getValues('email') })
    if (!parsed.success) {
      applyZodFieldErrors(setError, parsed.error)
      return
    }
    setStep(2)
  }

  function onStep2Next(e: FormSubmitLike) {
    e.preventDefault()
    clearErrors(['password', 'passwordConfirm'])
    const parsed = signupPasswordFieldsSchema.safeParse({
      password: getValues('password'),
      passwordConfirm: getValues('passwordConfirm'),
    })
    if (!parsed.success) {
      applyZodFieldErrors(setError, parsed.error)
      return
    }
    setStep(3)
  }

  const onFinish = handleSubmit(async (data) => {
    const parsed = signupFormSchema.safeParse(data)
    if (!parsed.success) {
      applyZodFieldErrors(setError, parsed.error)
      return
    }
    setSubmitError(undefined)
    setIsSubmitting(true)
    try {
      const payload: SignupSubmitPayload = {
        email: parsed.data.email,
        password: parsed.data.password,
        nickname: parsed.data.nickname,
      }
      await signup(payload)
      navigate('/login')
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : '회원가입에 실패했습니다.',
      )
    } finally {
      setIsSubmitting(false)
    }
  })

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
          <h1 className="text-xl font-bold text-white">회원가입</h1>
        </div>

        {step === 1 ? (
          <>
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

            <form className="flex flex-col gap-3" onSubmit={onStep1Next} noValidate>
              <div className="flex flex-col gap-1.5">
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="이메일을 입력해주세요!"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'signup-email-error' : undefined}
                  className={`w-full rounded-lg border bg-zinc-800 px-4 py-3 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:ring-1 ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                      : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500'
                  }`}
                  {...register('email')}
                />
                {errors.email ? (
                  <p
                    id="signup-email-error"
                    role="alert"
                    className="text-left text-sm text-red-400"
                  >
                    {errors.email.message}
                  </p>
                ) : null}
              </div>
              <button
                type="submit"
                disabled={!canStep1}
                className="mt-2 w-full rounded-lg bg-zinc-800 py-3 text-[15px] font-bold text-zinc-500 transition duration-300 enabled:bg-main-pink enabled:text-white disabled:cursor-not-allowed"
              >
                다음
              </button>
            </form>
          </>
        ) : null}

        {step === 2 ? (
          <form className="flex flex-col gap-4" onSubmit={onStep2Next} noValidate>
            <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-[15px] text-white">
              <Mail className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden />
              <span className="truncate">{getValues('email').trim()}</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="비밀번호를 입력해주세요!"
                  aria-invalid={errors.password ? true : undefined}
                  aria-describedby={errors.password ? 'signup-pw-error' : undefined}
                  className={`w-full rounded-lg border bg-zinc-800 py-3 pl-4 pr-12 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:ring-1 ${
                    errors.password
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                      : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500'
                  }`}
                  {...register('password')}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                  aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
                >
                  {showPw ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password ? (
                <p
                  id="signup-pw-error"
                  role="alert"
                  className="text-left text-sm text-red-400"
                >
                  {errors.password.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="relative">
                <input
                  type={showPw2 ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="비밀번호를 다시 한 번 입력해주세요!"
                  aria-invalid={errors.passwordConfirm ? true : undefined}
                  aria-describedby={
                    errors.passwordConfirm ? 'signup-pw2-error' : undefined
                  }
                  className={`w-full rounded-lg border bg-zinc-800 py-3 pl-4 pr-12 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:ring-1 ${
                    errors.passwordConfirm
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                      : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500'
                  }`}
                  {...register('passwordConfirm')}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPw2((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                  aria-label={
                    showPw2 ? '비밀번호 확인 숨기기' : '비밀번호 확인 보기'
                  }
                >
                  {showPw2 ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.passwordConfirm ? (
                <p
                  id="signup-pw2-error"
                  role="alert"
                  className="text-left text-sm text-red-400"
                >
                  {errors.passwordConfirm.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={!canStep2}
              className="mt-2 w-full rounded-lg bg-zinc-800 py-3 text-[15px] font-bold text-zinc-500 transition duration-300 enabled:bg-main-pink enabled:text-white disabled:cursor-not-allowed"
            >
              다음
            </button>
          </form>
        ) : null}

        {step === 3 ? (
          <form className="flex flex-col gap-3" onSubmit={onFinish} noValidate>
            <div className="flex flex-col gap-1.5">
              <input
                type="text"
                autoComplete="nickname"
                placeholder="닉네임을 입력해주세요!"
                aria-invalid={errors.nickname ? true : undefined}
                aria-describedby={errors.nickname ? 'signup-nick-error' : undefined}
                className={`w-full rounded-lg border bg-zinc-800 px-4 py-3 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:ring-1 ${
                  errors.nickname
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                    : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500'
                }`}
                {...register('nickname', {
                  onChange: () => setSubmitError(undefined),
                })}
              />
              {errors.nickname ? (
                <p
                  id="signup-nick-error"
                  role="alert"
                  className="text-left text-sm text-red-400"
                >
                  {errors.nickname.message}
                </p>
              ) : null}
            </div>
            {submitError ? (
              <p role="alert" className="text-left text-sm text-red-400">
                {submitError}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={!canStep3 || isSubmitting}
              className="mt-2 w-full rounded-lg bg-zinc-800 py-3 text-[15px] font-bold text-zinc-500 transition duration-300 enabled:bg-main-pink enabled:text-white disabled:cursor-not-allowed"
            >
              {isSubmitting ? '처리 중…' : '회원가입 완료'}
            </button>
          </form>
        ) : null}
      </div>
    </main>
  )
}

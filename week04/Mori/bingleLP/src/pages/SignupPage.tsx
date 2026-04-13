import { type BaseSyntheticEvent, useState } from 'react'
import { type FieldErrors, type UseFormRegister, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Mail } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { AuthInput } from '../components/auth/AuthInput'
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
type FormSubmitLike = { preventDefault(): void }
type PasswordVisibilityState = { showPw: boolean; showPw2: boolean }

const SUBMIT_BUTTON_CLASS =
  'mt-2 w-full rounded-lg bg-zinc-800 py-3 text-[15px] font-bold text-zinc-500 transition duration-300 enabled:bg-main-pink enabled:text-white disabled:cursor-not-allowed'

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
          <SignupEmailStep
            canStep1={canStep1}
            onStep1Next={onStep1Next}
            startGoogleLogin={startGoogleLogin}
            register={register}
            errors={errors}
          />
        ) : null}

        {step === 2 ? (
          <SignupPasswordStep
            canStep2={canStep2}
            onStep2Next={onStep2Next}
            register={register}
            errors={errors}
            email={getValues('email').trim()}
            passwordVisibility={{ showPw, showPw2 }}
            onTogglePassword={() => setShowPw((s) => !s)}
            onTogglePasswordConfirm={() => setShowPw2((s) => !s)}
          />
        ) : null}

        {step === 3 ? (
          <SignupNicknameStep
            canStep3={canStep3}
            isSubmitting={isSubmitting}
            submitError={submitError}
            onFinish={onFinish}
            register={register}
            errors={errors}
            onNicknameChange={() => setSubmitError(undefined)}
          />
        ) : null}
      </div>
    </main>
  )
}

type SignupEmailStepProps = {
  canStep1: boolean
  onStep1Next: (e: FormSubmitLike) => void
  startGoogleLogin: () => void
  register: UseFormRegister<SignupFormValues>
  errors: FieldErrors<SignupFormValues>
}

function SignupEmailStep({
  canStep1,
  onStep1Next,
  startGoogleLogin,
  register,
  errors,
}: SignupEmailStepProps) {
  return (
    <>
      <AuthSocialButton onClick={startGoogleLogin} label="Google 계정으로 로그인" />

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-zinc-700" />
        <span className="text-xs font-normal tracking-wider text-zinc-500">OR</span>
        <div className="h-px flex-1 bg-zinc-700" />
      </div>

      <form className="flex flex-col gap-3" onSubmit={onStep1Next} noValidate>
        <AuthInput
          type="email"
          autoComplete="email"
          placeholder="이메일을 입력해주세요!"
          error={errors.email?.message}
          errorId="signup-email-error"
          registration={register('email')}
        />
        <button type="submit" disabled={!canStep1} className={SUBMIT_BUTTON_CLASS}>
          다음
        </button>
      </form>
    </>
  )
}

type SignupPasswordStepProps = {
  canStep2: boolean
  onStep2Next: (e: FormSubmitLike) => void
  register: UseFormRegister<SignupFormValues>
  errors: FieldErrors<SignupFormValues>
  email: string
  passwordVisibility: PasswordVisibilityState
  onTogglePassword: () => void
  onTogglePasswordConfirm: () => void
}

function SignupPasswordStep({
  canStep2,
  onStep2Next,
  register,
  errors,
  email,
  passwordVisibility,
  onTogglePassword,
  onTogglePasswordConfirm,
}: SignupPasswordStepProps) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onStep2Next} noValidate>
      <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-[15px] text-white">
        <Mail className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden />
        <span className="truncate">{email}</span>
      </div>

      <AuthInput
        type={passwordVisibility.showPw ? 'text' : 'password'}
        autoComplete="new-password"
        placeholder="비밀번호를 입력해주세요!"
        error={errors.password?.message}
        errorId="signup-pw-error"
        registration={register('password')}
        rightPaddingClassName="pr-12"
        trailing={
          <button
            type="button"
            tabIndex={-1}
            onClick={onTogglePassword}
            className="text-zinc-400 hover:text-zinc-200"
            aria-label={passwordVisibility.showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {passwordVisibility.showPw ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        }
      />

      <AuthInput
        type={passwordVisibility.showPw2 ? 'text' : 'password'}
        autoComplete="new-password"
        placeholder="비밀번호를 다시 한 번 입력해주세요!"
        error={errors.passwordConfirm?.message}
        errorId="signup-pw2-error"
        registration={register('passwordConfirm')}
        rightPaddingClassName="pr-12"
        trailing={
          <button
            type="button"
            tabIndex={-1}
            onClick={onTogglePasswordConfirm}
            className="text-zinc-400 hover:text-zinc-200"
            aria-label={
              passwordVisibility.showPw2
                ? '비밀번호 확인 숨기기'
                : '비밀번호 확인 보기'
            }
          >
            {passwordVisibility.showPw2 ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        }
      />

      <button type="submit" disabled={!canStep2} className={SUBMIT_BUTTON_CLASS}>
        다음
      </button>
    </form>
  )
}

type SignupNicknameStepProps = {
  canStep3: boolean
  isSubmitting: boolean
  submitError?: string
  onFinish: (event?: BaseSyntheticEvent) => Promise<void>
  register: UseFormRegister<SignupFormValues>
  errors: FieldErrors<SignupFormValues>
  onNicknameChange: () => void
}

function SignupNicknameStep({
  canStep3,
  isSubmitting,
  submitError,
  onFinish,
  register,
  errors,
  onNicknameChange,
}: SignupNicknameStepProps) {
  return (
    <form className="flex flex-col gap-3" onSubmit={onFinish} noValidate>
      <AuthInput
        type="text"
        autoComplete="nickname"
        placeholder="닉네임을 입력해주세요!"
        error={errors.nickname?.message}
        errorId="signup-nick-error"
        registration={register('nickname', {
          onChange: onNicknameChange,
        })}
      />
      {submitError ? (
        <p role="alert" className="text-left text-sm text-red-400">
          {submitError}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={!canStep3 || isSubmitting}
        className={SUBMIT_BUTTON_CLASS}
      >
        {isSubmitting ? '처리 중…' : '회원가입 완료'}
      </button>
    </form>
  )
}

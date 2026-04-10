import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Mail } from 'lucide-react'
import { useSignupForm } from '../hooks/useForm'

export function SignupPage() {
  const navigate = useNavigate()
  const {
    step, values, errors, canStep1, canStep2, canStep3, showPw, showPw2,
    handleBack, goStep2, goStep3, finishSignup, toggleShowPw, toggleShowPw2,
    changeEmail, blurEmail,
    changePassword, blurPasswordField,
    changePasswordConfirm, blurPasswordConfirmField,
    changeNickname, blurNickname,
  } = useSignupForm(navigate)

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
            <button
              type="button"
              className="grid w-full grid-cols-[3rem_minmax(0,1fr)_3rem] items-center rounded-lg border border-zinc-600 bg-transparent py-2 text-md font-normal text-white transition hover:bg-zinc-900"
            >
              <span className="flex h-10 items-center justify-start pl-3">
                <img
                  src="/googleLogo.png"
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 shrink-0 object-contain"
                  decoding="async"
                />
              </span>
              <span className="truncate text-center">Google 계정으로 로그인</span>
              <span className="pointer-events-none select-none" aria-hidden />
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-zinc-700" />
              <span className="text-xs font-normal tracking-wider text-zinc-500">
                OR
              </span>
              <div className="h-px flex-1 bg-zinc-700" />
            </div>

            <form className="flex flex-col gap-3" onSubmit={goStep2} noValidate>
              <div className="flex flex-col gap-1.5">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="이메일을 입력해주세요!"
                  value={values.email}
                  onChange={(e) => changeEmail(e.target.value)}
                  onBlur={blurEmail}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'signup-email-error' : undefined}
                  className={`w-full rounded-lg border bg-zinc-800 px-4 py-3 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:ring-1 ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                      : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500'
                  }`}
                />
                {errors.email ? (
                  <p
                    id="signup-email-error"
                    role="alert"
                    className="text-left text-sm text-red-400"
                  >
                    {errors.email}
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
          <form className="flex flex-col gap-4" onSubmit={goStep3} noValidate>
            <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-[15px] text-white">
              <Mail className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden />
              <span className="truncate">{values.email.trim()}</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  name="password"
                  autoComplete="new-password"
                  placeholder="비밀번호를 입력해주세요!"
                  value={values.password}
                  onChange={(e) => changePassword(e.target.value)}
                  onBlur={blurPasswordField}
                  aria-invalid={errors.password ? true : undefined}
                  aria-describedby={errors.password ? 'signup-pw-error' : undefined}
                  className={`w-full rounded-lg border bg-zinc-800 py-3 pl-4 pr-12 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:ring-1 ${
                    errors.password
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                      : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500'
                  }`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={toggleShowPw}
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
                  {errors.password}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="relative">
                <input
                  type={showPw2 ? 'text' : 'password'}
                  name="passwordConfirm"
                  autoComplete="new-password"
                  placeholder="비밀번호를 다시 한 번 입력해주세요!"
                  value={values.passwordConfirm}
                  onChange={(e) => changePasswordConfirm(e.target.value)}
                  onBlur={blurPasswordConfirmField}
                  aria-invalid={errors.passwordConfirm ? true : undefined}
                  aria-describedby={
                    errors.passwordConfirm ? 'signup-pw2-error' : undefined
                  }
                  className={`w-full rounded-lg border bg-zinc-800 py-3 pl-4 pr-12 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:ring-1 ${
                    errors.passwordConfirm
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                      : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500'
                  }`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={toggleShowPw2}
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
                  {errors.passwordConfirm}
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
          <form
            className="flex flex-col gap-3"
            onSubmit={finishSignup}
            noValidate
          >
            <div className="flex flex-col gap-1.5">
              <input
                type="text"
                name="nickname"
                autoComplete="nickname"
                placeholder="닉네임을 입력해주세요!"
                value={values.nickname}
                onChange={(e) => changeNickname(e.target.value)}
                onBlur={blurNickname}
                aria-invalid={errors.nickname ? true : undefined}
                aria-describedby={errors.nickname ? 'signup-nick-error' : undefined}
                className={`w-full rounded-lg border bg-zinc-800 px-4 py-3 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:ring-1 ${
                  errors.nickname
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                    : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500'
                }`}
              />
              {errors.nickname ? (
                <p
                  id="signup-nick-error"
                  role="alert"
                  className="text-left text-sm text-red-400"
                >
                  {errors.nickname}
                </p>
              ) : null}
            </div>
            <button
              type="submit"
              disabled={!canStep3}
              className="mt-2 w-full rounded-lg bg-zinc-800 py-3 text-[15px] font-bold text-zinc-500 transition duration-300 enabled:bg-main-pink enabled:text-white disabled:cursor-not-allowed"
            >
              회원가입 완료
            </button>
          </form>
        ) : null}
      </div>
    </main>
  )
}

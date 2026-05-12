import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import { useLoginForm } from '../hooks/useForm'

export function LoginPage() {
  const navigate = useNavigate()
  const { values, errors, setField, blurField, handleSubmit, canSubmit } =
    useLoginForm()

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

        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit()}
          noValidate
        >
          <div className="flex flex-col gap-1.5">
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="이메일을 입력해주세요!"
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              onBlur={() => blurField('email')}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full rounded-lg border bg-zinc-800 px-4 py-3 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:ring-1 ${
                errors.email
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                  : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500'
              }`}
            />
            {errors.email ? (
              <p
                id="email-error"
                role="alert"
                className="text-left text-sm text-red-400"
              >
                {errors.email}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-1.5">
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="비밀번호를 입력해주세요!"
              value={values.password}
              onChange={(e) => setField('password', e.target.value)}
              onBlur={() => blurField('password')}
              aria-invalid={errors.password ? true : undefined}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={`w-full rounded-lg border bg-zinc-800 px-4 py-3 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:ring-1 ${
                errors.password
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
                  : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500'
              }`}
            />
            {errors.password ? (
              <p
                id="password-error"
                role="alert"
                className="text-left text-sm text-red-400"
              >
                {errors.password}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-2 w-full rounded-lg bg-zinc-800 py-3 text-[15px] font-bold text-zinc-500 transition duration-300 enabled:bg-main-pink enabled:text-white disabled:cursor-not-allowed"
          >
            로그인
          </button>
        </form>
      </div>
    </main>
  )
}

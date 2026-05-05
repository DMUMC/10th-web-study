import type { ReactNode } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

type AuthInputProps = {
  type: string
  autoComplete?: string
  placeholder: string
  error?: string
  errorId: string
  registration: UseFormRegisterReturn
  trailing?: ReactNode
  rightPaddingClassName?: string
}

export function AuthInput({
  type,
  autoComplete,
  placeholder,
  error,
  errorId,
  registration,
  trailing,
  rightPaddingClassName = 'pr-4',
}: AuthInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <input
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`w-full rounded-lg border bg-zinc-800 py-3 pl-4 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:ring-1 ${rightPaddingClassName} ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40'
              : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-500'
          }`}
          {...registration}
        />
        {trailing ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{trailing}</div>
        ) : null}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-left text-sm text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  )
}

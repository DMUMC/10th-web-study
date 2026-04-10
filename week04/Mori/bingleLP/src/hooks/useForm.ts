import { useMemo, useState } from 'react'

type FormSubmitLike = { preventDefault(): void }

export const EMAIL_ERROR = '유효하지 않은 이메일 형식입니다.'
export const PASSWORD_MIN_LENGTH = 6
export const PASSWORD_ERROR = '비밀번호는 최소 6자 이상이어야 합니다.'

function isValidEmail(value: string): boolean {
  const v = value.trim()
  if (!v) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function isValidPassword(value: string): boolean {
  return value.length >= PASSWORD_MIN_LENGTH
}

function emailError(value: string): string | undefined {
  return isValidEmail(value) ? undefined : EMAIL_ERROR
}

function passwordError(value: string): string | undefined {
  return isValidPassword(value) ? undefined : PASSWORD_ERROR
}

type Field = 'email' | 'password'

export function useLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailErr, setEmailErr] = useState<string | undefined>()
  const [passwordErr, setPasswordErr] = useState<string | undefined>()

  const values = useMemo(() => ({ email, password }), [email, password])
  const errors = useMemo(
    () => ({ email: emailErr, password: passwordErr }),
    [emailErr, passwordErr],
  )

  const canSubmit = isValidEmail(email) && isValidPassword(password)

  function setField(name: Field, value: string) {
    if (name === 'email') {
      setEmail(value)
      setEmailErr((prev) => {
        if (prev === undefined) return undefined
        if (value.trim() === '') return undefined
        return emailError(value)
      })
    } else {
      setPassword(value)
      setPasswordErr((prev) => {
        if (prev === undefined) return undefined
        if (value.length === 0) return undefined
        return passwordError(value)
      })
    }
  }

  function blurField(name: Field) {
    if (name === 'email') {
      setEmailErr(email.trim() === '' ? undefined : emailError(email))
    } else {
      setPasswordErr(password.length === 0 ? undefined : passwordError(password))
    }
  }

  function handleSubmit(onValid?: (v: { email: string; password: string }) => void) {
    return (e: FormSubmitLike) => {
      e.preventDefault()
      const ee = emailError(email)
      const pe = passwordError(password)
      setEmailErr(ee)
      setPasswordErr(pe)
      if (ee !== undefined || pe !== undefined) return
      onValid?.({ email, password })
    }
  }

  return {
    values,
    errors,
    setField,
    blurField,
    handleSubmit,
    canSubmit,
  } as const
}

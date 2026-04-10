import { useMemo, useState } from 'react'
import type { NavigateFunction } from 'react-router-dom'

type FormSubmitLike = { preventDefault(): void }

export const EMAIL_ERROR = '유효하지 않은 이메일 형식입니다.'
export const PASSWORD_MIN_LENGTH = 6
export const PASSWORD_ERROR = '비밀번호는 최소 6자 이상이어야 합니다.'
export const PASSWORD_MISMATCH = '비밀번호가 일치하지 않습니다.'
export const NICKNAME_ERROR = '닉네임을 입력해주세요.'

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

export type SignupStep = 1 | 2 | 3

export function useSignupForm(navigate: NavigateFunction) {
  const [step, setStep] = useState<SignupStep>(1)

  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState<string | undefined>()

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordErr, setPasswordErr] = useState<string | undefined>()
  const [passwordConfirmErr, setPasswordConfirmErr] = useState<
    string | undefined
  >()
  const [showPw, setShowPw] = useState(false)
  const [showPw2, setShowPw2] = useState(false)

  const [nickname, setNickname] = useState('')
  const [nicknameErr, setNicknameErr] = useState<string | undefined>()

  const values = useMemo(
    () => ({ email, password, passwordConfirm, nickname }),
    [email, password, passwordConfirm, nickname],
  )

  const errors = useMemo(
    () => ({
      email: emailErr,
      password: passwordErr,
      passwordConfirm: passwordConfirmErr,
      nickname: nicknameErr,
    }),
    [emailErr, passwordErr, passwordConfirmErr, nicknameErr],
  )

  const canStep1 = isValidEmail(email)
  const canStep2 =
    isValidPassword(password) &&
    isValidPassword(passwordConfirm) &&
    password === passwordConfirm
  const canStep3 = nickname.trim().length > 0

  function handleBack() {
    if (step === 1) navigate(-1)
    else if (step === 2) setStep(1)
    else setStep(2)
  }

  function changeEmail(value: string) {
    setEmail(value)
    setEmailErr((prev) =>
      prev === undefined
        ? undefined
        : isValidEmail(value) || value.trim() === ''
          ? undefined
          : EMAIL_ERROR,
    )
  }

  function blurEmail() {
    setEmailErr(
      email.trim() === ''
        ? undefined
        : isValidEmail(email)
          ? undefined
          : EMAIL_ERROR,
    )
  }

  function goStep2(e: FormSubmitLike) {
    e.preventDefault()
    const ee = emailError(email)
    setEmailErr(ee)
    if (ee !== undefined) return
    setStep(2)
  }

  function changePassword(value: string) {
    setPassword(value)
    setPasswordErr((prev) => {
      if (prev === undefined) return undefined
      if (value.length === 0) return undefined
      return passwordError(value)
    })
  }

  function blurPasswordField() {
    setPasswordErr(
      password.length === 0
        ? undefined
        : passwordError(password),
    )
  }

  function changePasswordConfirm(value: string) {
    setPasswordConfirm(value)
    setPasswordConfirmErr((prev) => {
      if (prev === undefined) return undefined
      if (value.length === 0) return undefined
      if (!isValidPassword(value)) return PASSWORD_ERROR
      if (password !== value) return PASSWORD_MISMATCH
      return undefined
    })
  }

  function blurPasswordConfirmField() {
    if (passwordConfirm.length === 0) {
      setPasswordConfirmErr(undefined)
      return
    }
    if (!isValidPassword(passwordConfirm)) {
      setPasswordConfirmErr(PASSWORD_ERROR)
      return
    }
    if (password !== passwordConfirm) {
      setPasswordConfirmErr(PASSWORD_MISMATCH)
      return
    }
    setPasswordConfirmErr(undefined)
  }

  function goStep3(e: FormSubmitLike) {
    e.preventDefault()
    let pe: string | undefined
    let pce: string | undefined
    if (!isValidPassword(password)) pe = PASSWORD_ERROR
    if (!isValidPassword(passwordConfirm)) pce = PASSWORD_ERROR
    if (!pe && !pce && password !== passwordConfirm) {
      pce = PASSWORD_MISMATCH
    }
    setPasswordErr(pe)
    setPasswordConfirmErr(pce)
    if (pe !== undefined || pce !== undefined) return
    setStep(3)
  }

  function changeNickname(value: string) {
    setNickname(value)
    setNicknameErr((prev) =>
      prev === undefined
        ? undefined
        : value.trim().length > 0
          ? undefined
          : NICKNAME_ERROR,
    )
  }

  function blurNickname() {
    setNicknameErr(
      nickname.trim().length > 0 ? undefined : NICKNAME_ERROR,
    )
  }

  function finishSignup(e: FormSubmitLike) {
    e.preventDefault()
    const n = nickname.trim()
    const ne = n.length > 0 ? undefined : NICKNAME_ERROR
    setNicknameErr(ne)
    if (ne !== undefined) return
    navigate('/')
  }

  function toggleShowPw() {
    setShowPw((s) => !s)
  }

  function toggleShowPw2() {
    setShowPw2((s) => !s)
  }

  return {
    step,
    values,
    errors,
    showPw,
    showPw2,
    canStep1,
    canStep2,
    canStep3,
    handleBack,
    changeEmail,
    blurEmail,
    goStep2,
    changePassword,
    blurPasswordField,
    changePasswordConfirm,
    blurPasswordConfirmField,
    goStep3,
    changeNickname,
    blurNickname,
    finishSignup,
    toggleShowPw,
    toggleShowPw2,
  } as const
}

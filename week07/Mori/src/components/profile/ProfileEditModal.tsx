import { useCallback, useEffect, useId, useRef, useState, type ChangeEvent, type MouseEvent, type SubmitEvent } from 'react'
import { Loader2, X } from 'lucide-react'
import type { UserProfile } from '../../api/types'
import { useUpdateProfileMutation } from '../../queries/myProfile'
import { ProfileAvatar } from './ProfileAvatar'

type ProfileEditModalProps = {
  open: boolean
  profile: UserProfile
  onClose: () => void
  onUpdated: (profile: UserProfile) => void
}

export function ProfileEditModal({
  open,
  profile,
  onClose,
  onUpdated,
}: ProfileEditModalProps) {
  const titleId = useId()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState(profile.name)
  const [bio, setBio] = useState(profile.bio ?? '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile.avatar)
  const [formError, setFormError] = useState<string | null>(null)

  const resetForm = useCallback(() => {
    setName(profile.name)
    setBio(profile.bio ?? '')
    setImageFile(null)
    setFormError(null)
    setAvatarPreview((prev) => {
      if (prev && prev !== profile.avatar && prev.startsWith('blob:')) {
        URL.revokeObjectURL(prev)
      }
      return profile.avatar
    })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [profile])

  const closeModal = useCallback(() => {
    resetForm()
    onClose()
  }, [onClose, resetForm])

  const updateMutation = useUpdateProfileMutation({
    onSuccess: (updated) => {
      onUpdated(updated)
      closeModal()
    },
  })

  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !updateMutation.isPending) closeModal()
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, closeModal, updateMutation.isPending])

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (updateMutation.isPending) return
    if (event.target === event.currentTarget) closeModal()
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setImageFile(file)
    if (avatarPreview?.startsWith('blob:')) URL.revokeObjectURL(avatarPreview)
    setAvatarPreview(URL.createObjectURL(file))
    setFormError(null)
  }

  function handleRemoveAvatar() {
    setImageFile(null)
    if (avatarPreview?.startsWith('blob:')) URL.revokeObjectURL(avatarPreview)
    setAvatarPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    updateMutation.mutate(
      {
        name,
        bio,
        imageFile,
        currentAvatar: avatarPreview?.startsWith('blob:') ? profile.avatar : avatarPreview,
      },
      {
        onError: (err) => {
          setFormError(
            err instanceof Error ? err.message : '프로필 수정에 실패했습니다.',
          )
        },
      },
    )
  }

  if (!open) return null

  const submitError =
    formError ??
    (updateMutation.isError && updateMutation.error instanceof Error
      ? updateMutation.error.message
      : null)

  const displayName = name.trim() || profile.name

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4 py-8"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-800 px-6 pb-6 pt-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeModal}
          disabled={updateMutation.isPending}
          aria-label="닫기"
          className="absolute right-4 top-4 rounded-md p-1 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <h2 id={titleId} className="sr-only">
          프로필 설정
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
          <div className="mt-2 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={updateMutation.isPending}
              className="rounded-full transition hover:opacity-90 disabled:opacity-60"
              aria-label="프로필 사진 변경"
            >
              <ProfileAvatar src={avatarPreview} name={displayName} size="lg" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleImageChange}
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={updateMutation.isPending}
                className="text-xs text-main-pink transition hover:underline disabled:opacity-40"
              >
                사진 변경
              </button>
              {avatarPreview ? (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  disabled={updateMutation.isPending}
                  className="text-xs text-white/50 transition hover:text-white/80 disabled:opacity-40"
                >
                  사진 제거
                </button>
              ) : null}
            </div>
          </div>

          <div className="flex w-full flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="profile-name" className="text-xs font-medium text-white/60">
                이름
              </label>
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={updateMutation.isPending}
                required
                className="w-full rounded-lg border border-zinc-600 bg-zinc-900 px-4 py-3 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 disabled:opacity-60"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="profile-bio" className="text-xs font-medium text-white/60">
                Bio <span className="text-white/35">(선택)</span>
              </label>
              <textarea
                id="profile-bio"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                disabled={updateMutation.isPending}
                rows={3}
                placeholder="자기소개를 입력해 주세요."
                className="w-full resize-none rounded-lg border border-zinc-600 bg-zinc-900 px-4 py-3 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 disabled:opacity-60"
              />
            </div>
          </div>

          {submitError ? (
            <p role="alert" className="w-full text-center text-sm text-red-400">
              {submitError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={updateMutation.isPending || name.trim().length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-main-pink py-3 text-[15px] font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
          >
            {updateMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : null}
            저장
          </button>
        </form>
      </div>
    </div>
  )
}

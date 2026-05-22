import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type SubmitEvent,
  type MouseEvent,
} from 'react'
import { Loader2, X } from 'lucide-react'
import { useCreateLpMutation } from '../../queries/createLp'

type LpCreateModalProps = {
  open: boolean
  onClose: () => void
}

export function LpCreateModal({ open, onClose }: LpCreateModalProps) {
  const titleId = useId()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  const resetForm = useCallback(() => {
    setName('')
    setContent('')
    setTagInput('')
    setTags([])
    setImageFile(null)
    setFormError(null)
    setImagePreview((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [])

  const closeModal = useCallback(() => {
    resetForm()
    onClose()
  }, [onClose, resetForm])

  const createLpMutation = useCreateLpMutation({
    onSuccess: closeModal,
  })

  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !createLpMutation.isPending) closeModal()
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, closeModal, createLpMutation.isPending])

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (createLpMutation.isPending) return
    if (event.target === event.currentTarget) closeModal()
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setImageFile(file)
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImagePreview(URL.createObjectURL(file))
    setFormError(null)
  }

  function handleAddTag() {
    const trimmed = tagInput.trim()
    if (!trimmed || tags.includes(trimmed)) return
    setTags((prev) => [...prev, trimmed])
    setTagInput('')
  }

  function handleRemoveTag(tag: string) {
    setTags((prev) => prev.filter((item) => item !== tag))
  }

  function handleTagKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') return
    event.preventDefault()
    handleAddTag()
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const title = name.trim()
    const body = content.trim()

    if (!title) {
      setFormError('LP 이름을 입력해 주세요.')
      return
    }
    if (!body) {
      setFormError('LP 내용을 입력해 주세요.')
      return
    }
    if (!imageFile) {
      setFormError('LP 사진을 선택해 주세요.')
      return
    }

    createLpMutation.mutate({
      title,
      content: body,
      tags,
      imageFile,
    })
  }

  if (!open) return null

  const submitError =
    formError ??
    (createLpMutation.isError && createLpMutation.error instanceof Error
      ? createLpMutation.error.message
      : null)

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
          disabled={createLpMutation.isPending}
          aria-label="닫기"
          className="absolute right-4 top-4 rounded-md p-1 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <h2 id={titleId} className="sr-only">
          새 LP 작성
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={createLpMutation.isPending}
            className="group relative mt-2 flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-zinc-900 transition hover:border-main-pink/50 disabled:opacity-60"
            aria-label="LP 사진 업로드"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm text-white/45 transition group-hover:text-white/70">
                사진 추가
              </span>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleImageChange}
          />

          <div className="flex w-full flex-col gap-3">
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="LP Name"
              disabled={createLpMutation.isPending}
              className="w-full rounded-lg border border-zinc-600 bg-zinc-900 px-4 py-3 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 disabled:opacity-60"
            />
            <input
              type="text"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="LP Content"
              disabled={createLpMutation.isPending}
              className="w-full rounded-lg border border-zinc-600 bg-zinc-900 px-4 py-3 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 disabled:opacity-60"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="LP Tag"
                disabled={createLpMutation.isPending}
                className="min-w-0 flex-1 rounded-lg border border-zinc-600 bg-zinc-900 px-4 py-3 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 disabled:opacity-60"
              />
              <button
                type="button"
                onClick={handleAddTag}
                disabled={createLpMutation.isPending}
                className="shrink-0 rounded-lg border border-zinc-600 bg-zinc-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-600 disabled:opacity-60"
              >
                Add
              </button>
            </div>
            {tags.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="flex items-center gap-1 rounded-full bg-white/10 py-1 pl-3 pr-1.5 text-xs text-white/80"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      disabled={createLpMutation.isPending}
                      aria-label={`${tag} 태그 삭제`}
                      className="rounded-full p-0.5 text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {submitError ? (
            <p role="alert" className="w-full text-center text-sm text-red-400">
              {submitError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={createLpMutation.isPending}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-500 py-3 text-[15px] font-semibold text-white transition hover:bg-zinc-400 disabled:opacity-60"
          >
            {createLpMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                추가 중…
              </>
            ) : (
              'Add LP'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Loader2, MoreHorizontal } from 'lucide-react'
import type { LpComment } from '../../api/types'
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '../../queries/lpCommentMutations'

type LpCommentItemProps = {
  comment: LpComment
  lpId: number
  isOwner: boolean
  formatDateTime: (iso: string) => string
}

export function LpCommentItem({
  comment,
  lpId,
  isOwner,
  formatDateTime,
}: LpCommentItemProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editDraft, setEditDraft] = useState(comment.content)
  const [actionError, setActionError] = useState<string | null>(null)

  const updateMutation = useUpdateCommentMutation(lpId)
  const deleteMutation = useDeleteCommentMutation(lpId)

  const isBusy = updateMutation.isPending || deleteMutation.isPending

  useEffect(() => {
    if (!menuOpen) return

    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [menuOpen])

  function startEdit() {
    setActionError(null)
    setEditDraft(comment.content)
    setIsEditing(true)
    setMenuOpen(false)
  }

  function cancelEdit() {
    setEditDraft(comment.content)
    setIsEditing(false)
    setActionError(null)
  }

  function handleSaveEdit() {
    const content = editDraft.trim()
    if (!content) {
      setActionError('댓글 내용을 입력해 주세요.')
      return
    }

    setActionError(null)
    updateMutation.mutate(
      { commentId: comment.id, content },
      {
        onSuccess: () => {
          setIsEditing(false)
          setEditDraft(content)
        },
        onError: (err) => {
          setActionError(
            err instanceof Error ? err.message : '댓글 수정에 실패했습니다.',
          )
        },
      },
    )
  }

  function handleDelete() {
    if (!window.confirm('이 댓글을 삭제할까요?')) return

    setActionError(null)
    setMenuOpen(false)
    deleteMutation.mutate(comment.id, {
      onError: (err) => {
        setActionError(
          err instanceof Error ? err.message : '댓글 삭제에 실패했습니다.',
        )
      },
    })
  }

  return (
    <li className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 shrink-0 rounded-full bg-white/10" aria-hidden />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-white">
              {comment.author?.name ?? '작성자'}
            </p>
            <p className="text-xs text-white/45">{formatDateTime(comment.createdAt)}</p>
            {isOwner ? (
              <div ref={menuRef} className="relative ml-auto">
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  disabled={isBusy}
                  aria-label="댓글 메뉴"
                  aria-expanded={menuOpen}
                  className="rounded-md p-1 text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
                >
                  <MoreHorizontal className="h-4 w-4" aria-hidden />
                </button>
                {menuOpen ? (
                  <div
                    role="menu"
                    className="absolute right-0 top-full z-10 mt-1 min-w-28 overflow-hidden rounded-lg border border-white/10 bg-zinc-900 py-1 shadow-lg"
                  >
                    <button
                      type="button"
                      role="menuitem"
                      onClick={startEdit}
                      className="block w-full px-3 py-2 text-left text-sm text-white/90 transition hover:bg-white/10"
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleDelete}
                      className="block w-full px-3 py-2 text-left text-sm text-red-400 transition hover:bg-white/10"
                    >
                      삭제
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          {isEditing ? (
            <div className="mt-2 flex flex-col gap-2">
              <textarea
                value={editDraft}
                onChange={(event) => setEditDraft(event.target.value)}
                disabled={isBusy}
                rows={3}
                className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none ring-main-pink/30 focus:ring-2 disabled:opacity-60"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={cancelEdit}
                  disabled={isBusy}
                  className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/10 disabled:opacity-40"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  disabled={isBusy || editDraft.trim().length === 0}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-main-pink px-3 py-1.5 text-xs font-semibold text-white transition enabled:hover:opacity-95 disabled:opacity-40"
                >
                  {updateMutation.isPending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                  ) : null}
                  저장
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/80">
              {comment.content}
            </p>
          )}

          {actionError ? (
            <p role="alert" className="mt-2 text-xs text-red-400">
              {actionError}
            </p>
          ) : null}
        </div>
      </div>
    </li>
  )
}

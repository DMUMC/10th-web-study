import { Loader2 } from 'lucide-react'

export function QueryErrorCard(props: {
  message: string
  onRetry?: () => void
  onBack?: () => void
}) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 rounded-xl border border-red-400/25 bg-red-400/10 px-6 py-10 text-center">
      <p className="text-sm text-red-200">{props.message}</p>
      <div className="flex items-center gap-2">
        {props.onRetry ? (
          <button
            type="button"
            className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
            onClick={() => props.onRetry?.()}
          >
            다시 시도
          </button>
        ) : null}
        {props.onBack ? (
          <button
            type="button"
            className="rounded-lg border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5"
            onClick={() => props.onBack?.()}
          >
            뒤로
          </button>
        ) : null}
      </div>
    </div>
  )
}

export function QueryLoadingCenter(props: { label?: string }) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-3 px-4 py-12 text-white">
      <Loader2 className="h-5 w-5 animate-spin text-main-pink" aria-hidden />
      <p className="text-sm text-white/70">{props.label ?? '불러오는 중...'}</p>
    </div>
  )
}


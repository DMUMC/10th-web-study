interface QuantityControlProps {
  amount: number
  onDecrease: () => void
  onIncrease: () => void
  min?: number
}

export default function QuantityControl({
  amount,
  onDecrease,
  onIncrease,
  min = 1,
}: QuantityControlProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onDecrease}
        disabled={amount <= min}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-300 bg-white text-lg font-medium text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="수량 감소"
      >
        −
      </button>
      <span className="min-w-10 text-center text-sm font-semibold text-stone-800">
        {amount}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-600 bg-emerald-600 text-lg font-medium text-white transition hover:bg-emerald-700"
        aria-label="수량 증가"
      >
        +
      </button>
    </div>
  )
}

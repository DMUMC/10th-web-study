type TodoActionButtonProps = {
  label: string
  onClick: () => void
  variant?: 'green' | 'red'
}

export function TodoActionButton({
  label,
  onClick,
  variant = 'green',
}: TodoActionButtonProps) {
  const colorClass =
    variant === 'red'
      ? 'bg-red-500 hover:bg-red-600'
      : 'bg-green-500 hover:bg-green-600'

  return (
    <button
      className={`rounded-lg px-3 py-2 font-bold text-white transition ${colorClass}`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  )
}

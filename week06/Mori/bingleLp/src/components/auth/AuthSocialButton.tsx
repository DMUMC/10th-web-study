type AuthSocialButtonProps = {
  onClick: () => void
  label: string
}

export function AuthSocialButton({ onClick, label }: AuthSocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
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
      <span className="truncate text-center">{label}</span>
      <span className="pointer-events-none select-none" aria-hidden />
    </button>
  )
}

export function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M7.95 11.95h32m-32 12h32m-32 12h32"
      />
    </svg>
  )
}

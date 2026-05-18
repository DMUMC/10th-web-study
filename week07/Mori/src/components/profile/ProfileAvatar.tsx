import { User } from 'lucide-react'

type ProfileAvatarProps = {
  src: string | null | undefined
  name: string
  size?: 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  md: 'h-24 w-24',
  lg: 'h-32 w-32',
} as const

const iconSizes = {
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
} as const

export function ProfileAvatar({ src, name, size = 'lg', className = '' }: ProfileAvatarProps) {
  const dimension = sizeClasses[size]

  if (src) {
    return (
      <img
        src={src}
        alt={`${name} 프로필 사진`}
        className={`${dimension} shrink-0 rounded-full border border-white/15 object-cover ${className}`}
      />
    )
  }

  return (
    <div
      className={`${dimension} flex shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 ${className}`}
      aria-hidden
    >
      <User className={`${iconSizes[size]} text-white/40`} />
    </div>
  )
}

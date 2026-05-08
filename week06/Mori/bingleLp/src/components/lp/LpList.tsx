import type { LpItem } from '../../api/types'

type Props = {
  items: LpItem[]
}

export function LpList({ items }: Props) {
  return (
    <ul className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((lp) => (
        <li
          key={lp.id}
          className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
        >
          <div className="aspect-16/10 w-full bg-white/5">
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col gap-2 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="line-clamp-1 flex-1 text-sm font-semibold text-white">
                {lp.title}
              </p>
              {lp.published ? (
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-200">
                  공개
                </span>
              ) : (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white/70">
                  비공개
                </span>
              )}
            </div>
            <p className="line-clamp-2 text-sm text-white/70">{lp.content}</p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              {lp.tags?.slice(0, 3).map((t) => (
                <span
                  key={t.id}
                  className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white/80"
                >
                  #{t.name}
                </span>
              ))}
              <span className="ml-auto text-[11px] text-white/50">
                좋아요 {lp.likes?.length ?? 0}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

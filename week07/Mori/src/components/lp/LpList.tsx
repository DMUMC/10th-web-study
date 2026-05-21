import type { LpItem } from '../../api/types'
import { Link } from 'react-router-dom'

type Props = {
  items: LpItem[]
}

function formatUploadDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

export function LpList({ items }: Props) {
  return (
    <ul className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((lp) => (
        <li key={lp.id}>
          <Link
            to={`/lp/${lp.id}`}
            className="group relative block overflow-hidden rounded-xl border border-white/10 bg-white/5 outline-none ring-main-pink/40 transition hover:border-white/20 focus-visible:ring-2"
            aria-label={`${lp.title} 상세 보기`}
          >
            <div className="aspect-16/10 w-full bg-white/5">
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06] motion-reduce:transition-none"
                loading="lazy"
              />
            </div>

            {/* hover 전에는 이미지 외 UI를 숨기고, hover 시 오버레이로 메타 노출 */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="line-clamp-1 text-sm font-semibold text-white">
                  {lp.title}
                </p>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-white/70">
                  <span>업로드 {formatUploadDate(lp.createdAt)}</span>
                  <span className="ml-auto">좋아요 {lp.likes?.length ?? 0}</span>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <section className="py-10">
      <h1 className="text-3xl font-bold">TMDB 영화 탐색</h1>
      <p className="mt-3 text-zinc-300">
        상단 네비게이션에서 카테고리를 선택하면 TMDB 데이터를 불러와 카드로 보여줍니다.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/popular"
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10"
        >
          인기 영화 보러가기
        </Link>
      </div>
    </section>
  )
}


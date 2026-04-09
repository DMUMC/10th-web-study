import { useMemo, useState } from 'react'
import { type MovieResponse } from '../types/movies'
import MovieCard from '../components/MovieCard'
import Spinner from '../components/Spinner'
import { useCustomFetch } from '../hooks/useCustomFetch'

export type MovieCategory = 'popular' | 'upcoming' | 'top_rated' | 'now_playing'

const categoryTitle: Record<MovieCategory, string> = {
  popular: '인기 영화',
  upcoming: '개봉 예정',
  top_rated: '평점 높은',
  now_playing: '상영 중',
}

export default function MoviePage({ category }: { category: MovieCategory }) {
  const hasAuth = Boolean(import.meta.env.VITE_TMDB_API_KEY)

  const [page, setPage] = useState(1)

  const title = categoryTitle[category]
  const path = useMemo(() => `/movie/${category}`, [category])

  const { data, isLoading, error } = useCustomFetch<MovieResponse>(path, {
    enabled: hasAuth,
    params: { language: 'ko-KR', page },
  })

  const movies = data?.results ?? []
  const errorMessage = !hasAuth ? 'TMDB API 키가 없습니다.' : error

  return (
    <section>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-zinc-300">페이지: {page}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 disabled:opacity-40 disabled:hover:bg-white/10"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || isLoading}
          >
            이전
          </button>
          <button
            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 disabled:opacity-40 disabled:hover:bg-white/10"
            onClick={() => setPage((p) => p + 1)}
            disabled={isLoading}
          >
            다음
          </button>
        </div>
      </div>

      {isLoading && <Spinner />}

      {errorMessage && (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && (
        <div className="mt-6 grid gap-x-2 gap-y-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  )
}
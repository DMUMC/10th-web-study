import { useEffect, useMemo, useState } from 'react'
import { type MovieResponse, type Movie } from '../types/movies'
import MovieCard from '../components/MovieCard'
import Spinner from '../components/Spinner'
import { apiClient } from '../util/AxiosInstance'

export type MovieCategory = 'popular' | 'upcoming' | 'top_rated' | 'now_playing'

const categoryTitle: Record<MovieCategory, string> = {
  popular: '인기 영화',
  upcoming: '개봉 예정',
  top_rated: '평점 높은',
  now_playing: '상영 중',
}

export default function MoviePage({ category }: { category: MovieCategory }) {
  const hasAuth = Boolean(import.meta.env.VITE_TMDB_API_KEY)

  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const title = categoryTitle[category]
  const path = useMemo(() => `/movie/${category}`, [category])

  useEffect(() => {
    if (!hasAuth) {
      setErrorMessage('TMDB API 키가 없습니다.')
      return
    }

    const controller = new AbortController()
    let isMounted = true

    const fetchMovies = async () => {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const { data } = await apiClient.get<MovieResponse>(path, {
          params: { language: 'ko-KR', page },
          signal: controller.signal,
        })

        if (!isMounted) return
        setMovies(data.results)
      } catch (err: unknown) {
        if ((err as { name?: string })?.name === 'CanceledError') return
        if (!isMounted) return

        const message =
          err instanceof Error ? err.message : '영화 데이터를 불러오지 못했습니다.'
        setErrorMessage(message)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    void fetchMovies()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [hasAuth, path, page])

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
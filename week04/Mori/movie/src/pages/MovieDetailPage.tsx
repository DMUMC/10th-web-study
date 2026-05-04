import { useParams } from 'react-router-dom'
import { LoadingComponent } from '../components/LoadingComponent'
import { MovieInfo } from '../components/MovieInfo'
import { MovieCreditInfo } from '../components/MovieCreditInfo'
import type { MovieCredits, MovieDetails } from '../types/movies'
import { useCustomFetch } from '../hooks/useCustomFetch'

export const MovieDetailPage = () => {
  const { movieId } = useParams()

  const enabled = Boolean(movieId)

  const {
    data: details,
    isLoading: isDetailsLoading,
    error: detailsError,
  } = useCustomFetch<MovieDetails>(movieId ? `/movie/${movieId}` : null, {
    enabled,
    params: { language: 'ko-KR' },
  })

  const {
    data: credits,
    isLoading: isCreditsLoading,
    error: creditsError,
  } = useCustomFetch<MovieCredits>(movieId ? `/movie/${movieId}/credits` : null, {
    enabled,
    params: { language: 'ko-KR' },
  })

  const isPending = enabled && (isDetailsLoading || isCreditsLoading)
  const errorMessage = !movieId
    ? '잘못된 접근입니다. 영화 ID를 확인해 주세요.'
    : detailsError || creditsError

  if (errorMessage) {
    return (
      <div>
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {errorMessage}
        </div>
      </div>
    )
  }

  const casts = credits?.cast ?? []

  return (
    <LoadingComponent isPending={isPending}>
      {details ? (
        <>
          <MovieInfo details={details} />
          <MovieCreditInfo casts={casts} />
        </>
      ) : null}
    </LoadingComponent>
  )
}

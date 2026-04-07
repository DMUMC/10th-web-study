import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingComponent } from '../components/LoadingComponent'
import { MovieInfo } from '../components/MovieInfo'
import { MovieCreditInfo } from '../components/MovieCreditInfo'
import type { CastMember, MovieCredits, MovieDetails } from '../types/movies'
import { apiClient } from '../util/AxiosInstance'

export const MovieDetailPage = () => {
  const { movieId } = useParams()
  const [details, setDetails] = useState<MovieDetails | null>(null)
  const [casts, setCasts] = useState<CastMember[]>([])
  const [isPending, setIsPending] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!movieId) {
      setIsError(true)
      setIsPending(false)
      return
    }

    const controller = new AbortController()
    let isMounted = true

    const fetchAllData = async () => {
      try {
        setIsPending(true)
        setIsError(false)

        const [detailsRes, creditsRes] = await Promise.all([
          apiClient.get<MovieDetails>(`/movie/${movieId}`, {
            params: { language: 'ko-KR' },
            signal: controller.signal,
          }),
          apiClient.get<MovieCredits>(`/movie/${movieId}/credits`, {
            params: { language: 'ko-KR' },
            signal: controller.signal,
          }),
        ])

        if (!isMounted) return
        setDetails(detailsRes.data)
        setCasts(creditsRes.data.cast ?? [])
      } catch (err: unknown) {
        if ((err as { name?: string })?.name === 'CanceledError') return
        if (!isMounted) return
        console.error(err)
        setIsError(true)
      } finally {
        if (isMounted) setIsPending(false)
      }
    }

    void fetchAllData()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [movieId])

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    )
  }

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

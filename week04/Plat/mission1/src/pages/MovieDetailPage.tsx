import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import MovieProfile from "../components/MovieProfile";
import useMovieDetail from "../types/useMovieDetail";
import ApiError from "../components/ApiError";

export default function MovieDetailPage() {
    const { movieId } = useParams<{ movieId: string }>();
    const { movieDetail, credits, isPending, error } = useMovieDetail(movieId);
    
    return (
        <>
            {error && <ApiError />}
            {isPending ? (
                <div className="flex items-center justify-center h-screen">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movieDetail?.backdrop_path}`}
                        alt={movieDetail?.title}
                        className="absolute inset-0 h-full w-full object-cover blur-md brightness-50 scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col-reverse items-center justify-center gap-10 px-6 py-12 lg:flex-row lg:items-center lg:justify-between">
                        
                        <div className="max-w-2xl text-center lg:text-left">
                        <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
                            {movieDetail?.title}
                        </h1>

                        <div className="space-y-2 text-sm font-semibold text-gray-200 sm:text-base">
                            <p>평점 : {movieDetail?.vote_average}</p>
                            <p>개봉일 : {movieDetail?.release_date}</p>
                            <p>{movieDetail?.runtime} 분</p>
                        </div>

                        <p className="mt-8 text-xl italic text-gray-100 sm:text-2xl">
                            {movieDetail?.tagline && (
                                <span>"{movieDetail.tagline}"</span>
                            )}
                        </p>

                        <p className="mt-8 text-sm leading-7 text-gray-300 sm:text-base">
                            {movieDetail?.overview}
                        </p>
                        </div>
                        <div className="shrink-0">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`}
                            alt={movieDetail?.title}
                            className="w-56 rounded-lg border border-white/10 shadow-2xl sm:w-64 lg:w-80"
                        />
                        </div>
                    </div>
                    <MovieProfile credits={credits} />
                </div>
            )}
        </>
    );
};
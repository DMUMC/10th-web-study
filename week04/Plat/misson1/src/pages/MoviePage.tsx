import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieController from "../components/MovieController";
import { useParams } from "react-router-dom";
import useMovies from "../types/useMovies";
import ApiError from "../components/ApiError";

export default function MoviesPage() {
    const [page, setPage] = useState(1);
    const { category } = useParams< { category: string; } >();  
    const { movies, isPending, error, setError, setLoading } = useMovies(category!, page);

    useEffect(() => {
        setPage(1);
    }, [category]);

    return (
        <>
            <MovieController page={page} setPage={setPage} setError={setError} setLoading={setLoading} />
            { isPending && (<div className="flex items-center justify-center h-screen"> <LoadingSpinner /> </div>) }
            { error && <ApiError /> }
            { !isPending && !error && (
                <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </>
    )
}
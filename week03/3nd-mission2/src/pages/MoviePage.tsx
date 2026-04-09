import { useEffect, useState } from "react"
import axios from "axios";
import { type MovieResponse, type Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieController from "../components/MovieController";
import { useParams } from "react-router-dom";

export default function MoviesPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(1);
    const { category } = useParams< { category: string; } >();

    useEffect(() : void => {
        const fetchMovies = async() : Promise<void> => {
            try {
                const { data } = await axios.get<MovieResponse>(
                    `https://api.themoviedb.org/3/movie/${category}?language=ko&page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );
                setMovies(data.results);
            } catch {
                setIsError(true);
            } finally { 
                setIsPending(false);
            }
        };
        fetchMovies();
    }, [page, category]);    

    useEffect(() => {
        setPage(1);
    }, [category]);

    if(isError){
        return (
            <div>
                <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
            </div>
        );
    }

    return (
        <>
            <MovieController page={page} setPage={setPage} />
            <button  
                onClick={() => setIsPending(!isPending)}
                className="flex ml-auto m-5 px-2 py-1 bg-red-400 text-white rounded hover:bg-red-300 transition-colors">
                로딩 화면 출력
            </button>
            {isPending ? (
                <div className="flex items-center justify-center h-screen">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </>
    )
}
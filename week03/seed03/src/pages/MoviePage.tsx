// src/pages/movies.tsx
import { useState, useEffect } from "react";
import { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import "../css/movies.css";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";

const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(1);
    const { category } = useParams<{ category: string; }>();

    useEffect(() => {
        setPage(1);
    }, [category]);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsPending(true);

            try {
                const { data } = await axios.get<MovieResponse>(
                    `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzNlNmNjODNjMWU2NjFhMTUyNjg5N2E4OTAwNDkzNiIsIm5iZiI6MTc3NDY5MjcxMy44NTY5OTk5LCJzdWIiOiI2OWM3YTk2OTJiZGY1N2Y5ZDc5ZGU4NDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-vGBfDyqXQnwe61Y6d2AmLoie9UDR891Y51xdx6AaTA`, // 본인 TMDB 토큰으로 교체
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

    if (isError) {
        console.log(Error);
        return (
            <div>
                <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>

            </div>
        )
    }

    // if (isPending) {
    //     return (
    //         <div>
    //             <LoadingSpinner />
    //         </div>
    //     )
    // };

    return (
        <>
            <div className="flex items-center justify-center gap-6 mt-5">
                <button
                    className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
                hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
                cursor:pointer disabled:cursor-not-allowed"
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 1}>
                    {'<'}
                </button>
                <span>{page}페이지</span>
                <button
                    className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
                hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer"
                    onClick={() => setPage((prev) => prev + 1)}>
                    {'>'}
                </button>
            </div>


            {isPending ? (
                <div className="flex items-center justify-center h-dvh">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3
    md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}


        </>
    );
};

export default MoviesPage;
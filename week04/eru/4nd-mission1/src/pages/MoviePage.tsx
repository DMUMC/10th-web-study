import { useState } from "react";
import { type MovieResponse, type Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieController from "../components/MovieController";
import { useParams } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";

export default function MoviesPage() {
    const { category } = useParams<{ category: string }>();

    // category와 page를 하나의 state로 묶어 관리
    // category가 바뀌면 page도 함께 1로 리셋 → useEffect/useRef 불필요
    const [pagination, setPagination] = useState({
        category: category ?? "",
        page: 1,
    });

    // URL의 category가 state와 다르면 1페이지로 간주
    const resolvedPage = pagination.category === category ? pagination.page : 1;

    const setPage = (updater: React.SetStateAction<number>) => {
        setPagination((prev) => {
            const nextPage =
                typeof updater === "function" ? updater(prev.page) : updater;
            return { category: category ?? "", page: nextPage };
        });
    };

    const url = `https://api.themoviedb.org/3/movie/${category}?language=ko&page=${resolvedPage}`;
    const { data, isPending, isError } = useCustomFetch<MovieResponse>(url);

    const movies: Movie[] = data?.results ?? [];

    if (isError) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-white">
                <div className="text-5xl">⚠️</div>
                <p className="text-red-400 text-xl font-semibold">에러가 발생했습니다.</p>
                <p className="text-gray-500 text-sm">잠시 후 다시 시도해주세요.</p>
            </div>
        );
    }

    return (
        <>
            <MovieController page={resolvedPage} setPage={setPage} />
            {isPending ? (
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="flex flex-col items-center gap-4">
                        <LoadingSpinner />
                        <p className="text-gray-500 text-sm tracking-widest uppercase">불러오는 중...</p>
                    </div>
                </div>
            ) : (
                <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </>
    );
}
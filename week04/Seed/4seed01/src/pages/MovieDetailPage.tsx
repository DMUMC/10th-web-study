import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import useCustomFetch from '../useCustomFetch';

export default function MovieDetailPage() {
    const { movieId } = useParams();

    const [movie, setMovie] = useState<any>(null);
    const [credits, setCredits] = useState<any>(null);
    const [loading, toggleLoading] = useCustomFetch(true);
    // const [error, toggleError] = useState<string | null>(null);
    const [error, toggleError] = useCustomFetch(false);

    useEffect(() => {
        const fetchMovieData = async () => {
            if (!movieId) return;
            toggleLoading();
            toggleError();

            const options = {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzNlNmNjODNjMWU2NjFhMTUyNjg5N2E4OTAwNDkzNiIsIm5iZiI6MTc3NDY5MjcxMy44NTY5OTk5LCJzdWIiOiI2OWM3YTk2OTJiZGY1N2Y5ZDc5ZGU4NDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-vGBfDyqXQnwe61Y6d2AmLoie9UDR891Y51xdx6AaTA',
                    accept: 'application/json'
                }
            };


            try {
                const [detailRes, creditsRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, options),
                    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`, options)
                ]);

                const detailData = await detailRes.json();
                const creditsData = await creditsRes.json();

                setMovie(detailData);
                setCredits(creditsData);
            } catch (error) {
                console.error("데이터 로드 실패:", error);
            } finally {
                toggleLoading();
            }
        };

        fetchMovieData();
    }, [movieId]);

    if (loading) {
        return (
            <div className="p-10 text-white">
                <LoadingSpinner />
                <p>로딩 중...</p>
            </div>
        );
    };

    if (!movie) {
        return (
            <div className="p-10 text-white">
                영화 정보를 찾을 수 없습니다.
            </div>
        );

    };

    return (
        <div className="min-h-screen bg-black text-white">
            <section
                className="relative h-[450px] flex items-center p-12 bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(to right, black, transparent), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
            >
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-bold">{movie.title}</h1>
                    <p className="mt-4 text-gray-300">{movie.overview}</p>
                </div>
            </section>

            <section className="p-12">
                <h2 className="text-2xl font-bold mb-6">감독/출연</h2>
                <div className="flex gap-6 overflow-x-auto pb-4 
                p-10 grid gap-4 grid-cols-2 sm:grid-cols-3
    md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10">
                    {credits.cast.map((person: any) => (
                        <div key={person.id} className="w-24 flex-shrink-0 flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full border-2 border-gray-800 overflow-hidden bg-gray-900 flex items-center justify-center">
                                {person.profile_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                                        className="w-full h-full object-cover"
                                        alt={person.name}
                                    />
                                ) : (
                                    <span className="text-xs text-gray-500">No Image</span>
                                )}
                            </div>

                            <p className="text-sm mt-3 truncate w-full px-1">
                                {person.name}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
import { useEffect, useState } from "react";
import axios from "axios";
import type { MovieDetail, MovieCredits } from "./movie";

export default function useMovieDetail(movieId: string | undefined) {
    const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
    const [credits, setCredits] = useState<MovieCredits | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: detail } = await axios.get<MovieDetail>(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=ko`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );
                
                const { data: credits } = await axios.get<MovieCredits>(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                )
                setMovieDetail(detail);
                setCredits(credits);
            } catch (error) {
                setError(true);
            }
            finally {
                setLoading(false);
                setError(false);
            }
        }

        if (movieId) {
            fetchData();
        }
    }, [movieId]);

    return { movieDetail, credits, isPending: loading, error };
}
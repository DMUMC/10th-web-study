import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Movie, MovieResponse } from './movie'


export default function useMovies(category: string | undefined, page: number) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const { data } = await axios.get<MovieResponse>(
                    `https://api.themoviedb.org/3/movie/${category}?language=ko&page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                )
                setMovies(data.results);
            } catch (error) {
                setError(true);
            }
             finally {
                setLoading(false);
                setError(false);
            }
        }

        if (category) {
            fetchMovies();
        }
    }, [category, page]);

    return { movies, isPending: loading, error, setError, setLoading }
}
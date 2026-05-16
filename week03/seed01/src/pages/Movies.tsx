// src/pages/movies.tsx
import { useState, useEffect } from "react";
import { Movie, MovieResponse } from "../types/movie";
import axios from "axios";
import "../css/movies.css";

const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    console.log(movies);
    useEffect(() => {
        const fetchMovies = async () => {
            const { data } = await axios.get<MovieResponse>(
                ' https://api.themoviedb.org/3/movie/popular',
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzNlNmNjODNjMWU2NjFhMTUyNjg5N2E4OTAwNDkzNiIsIm5iZiI6MTc3NDY5MjcxMy44NTY5OTk5LCJzdWIiOiI2OWM3YTk2OTJiZGY1N2Y5ZDc5ZGU4NDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-vGBfDyqXQnwe61Y6d2AmLoie9UDR891Y51xdx6AaTA`, // 본인 TMDB 토큰으로 교체
                    },
                }
            );
            setMovies(data.results);
        };
        console.log("영화 데이터 불러오기 성공");
        fetchMovies();
    }, [])

    return (
        <ul className="grid grid-cols-6 max-w[1440px] mx-auto p-10 gap-5 items-center list-none">
            {movies?.map((movie) => (
                <li key={movie.id} className="movie-item">
                    <h2>{movie.title}</h2>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="movieImg w-[150px] h-[200px] object-cover mx-auto rounded-lg shadow-md"
                    />
                    <div className="movie-overlay">
                        <h2 className="movie-title">{movie.title}</h2>
                        <p className="movie-overview">{movie.overview}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default MoviesPage;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Movie, CreditResponse } from "../types/movie";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";

const MovieDetailPage = () => {
  const { movieId } = useParams<{
    movieId: string;
  }>();

  const { 
    data: movie, 
    isPending: isMovieLoading, 
    isError: isMovieError 
  } = useCustomFetch<Movie>(`/movie/${movieId}?language=ko-KR`);

  const { 
    data: credit, 
    isPending: isCreditLoading 
  } = useCustomFetch<CreditResponse>(`/movie/${movieId}/credits?language=ko-KR`);

  if (isMovieLoading || isCreditLoading){
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  if (isMovieError || !movie) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-white text-2xl font-bold">에러가 발생했습니다.</div>
      </div>
    );
  }
  const director = credit?.crew.find((person) => person.job === "Director");

  return (
    <div className="w-full bg-black min-h-screen text-white">
      <div className="relative w-full h-[500px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.1) 100%), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` 
          }}
        />

        <div className="relative z-10 px-10 max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
          
          <div className="flex items-center gap-4 text-lg mb-4">
            <span className="text-yellow-400 font-semibold text-xl">평점 {movie.vote_average.toFixed(1)}</span>
            <span>{movie.release_date?.split('-')[0]}</span>
            <span>{movie.runtime}분</span>
          </div>

          <h2 className="text-xl italic text-gray-300 mb-6 font-medium">"{movie.tagline}"</h2>
          
          <p className="text-lg leading-relaxed text-gray-200 line-clamp-6">
            {movie.overview}
          </p>
        </div>
      </div>

      <div className="p-10">
        <h3 className="text-3xl font-bold mb-10">감독/출연</h3>
        
        <div className="flex flex-wrap gap-10">
          {director && (
            <div className="flex flex-col items-center w-28 shrink-0">
              <img
                src={director.profile_path ? `https://image.tmdb.org/t/p/w200${director.profile_path}` : "https://via.placeholder.com/200x300?text=No+Image"}
                alt={director.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-700 mb-3 shadow-lg"
              />
              <p className="text-sm font-bold text-center w-full truncate">{director.name}</p>
              <p className="text-xs text-gray-500 mt-1">감독</p>
            </div>
          )}

          <div className="flex gap-8 overflow-x-auto pb-6 no-scrollbar">
            {credit?.cast.slice(0, 10).map((actor) => (
              <div key={actor.id} className="flex flex-col items-center w-28 shrink-0">
                <img
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : "https://via.placeholder.com/200x300?text=No+Image"}
                  alt={actor.name}
                  className="w-24 h-24 rounded-full object-cover mb-3 shadow-md"
                />
                <p className="text-sm font-bold text-center w-full truncate">{actor.name}</p>
                <p className="text-[11px] text-gray-400 text-center w-full truncate mt-1">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
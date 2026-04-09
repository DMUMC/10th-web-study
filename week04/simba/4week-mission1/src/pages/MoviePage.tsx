import { useEffect, useState } from "react"
import axios from "axios";
import type{ Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";

export default function MoviePage(){

  const [page, setPage]= useState(1);

  const { category } = useParams<{
    category: string;
  }>();

  const { data, isPending, isError} = useCustomFetch<MovieResponse>(
    `/movie/${category}?language=ko-KR&page=${page}`
  );

  const movies = data?.results || [];

  if (isError) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <span className="text-red-500 text-2xl font-bold">에러가 발생했습니다</span>
      </div>
    );
  }

 return(
  <>
    <Pagination page={page} setPage={setPage} />

    {isPending && 
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner/>
      </div>}
    {!isPending &&
    (
      <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie)=><MovieCard key={movie.id} movie={movie}/>)}
    </div>
    )}
  </>
  )
}
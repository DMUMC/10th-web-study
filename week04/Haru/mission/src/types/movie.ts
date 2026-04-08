export type Movie = {
  audlt: boolean;
  backdrop_path: string;
  genre_id: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime: number;
  tagline: string;
}

export type MovieResponse={
  page:number,
  results: Movie[],
  totalPages: number,
  total_results:number;
}

export type CreditResponse={
  id: number;
  cast: {
    id: number;
    name: string;         
    character: string;     
    profile_path: string | null;
  }[];
  crew: {
    id: number;
    name: string;          
    job: string;
    profile_path: string | null;           
  }[];
}
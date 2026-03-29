export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
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
};

export type MovieDetail = {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    tagline: string;
    adult: boolean;
    status: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    runtime: number;
    release_date: string;
    genres: {
      id: number;
      name: string;
    }[];
    production_companies: {
      id: number;
      name: string;
      logo_path: string | null;
      origin_country: string;
    }[];
};

export type MovieResponse = {
    page: number;
    results: Movie[];
    details: MovieDetail[];
    total_pages: number;
    total_results: number;
};

export type MovieCredits = {
    id: number;
    cast: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string | null;
      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
    }[];
};


import type { MovieDetails } from '../types/movies';

interface MovieInfoProps {
  details: MovieDetails;
}

export const MovieInfo = ({ details }: MovieInfoProps) => {
  const backdrop =
    details.backdrop_path != null
      ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
      : details.poster_path != null
        ? `https://image.tmdb.org/t/p/w780${details.poster_path}`
        : null

  return (
    <div className="relative w-full h-96 bg-zinc-900">
      {backdrop ? (
        <img
          src={backdrop}
          alt={`${details.title} 영화의 이미지`}
          className="w-full h-full object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/30 to-transparent
      text-white p-8 flex flex-col justify-center">
        <h2 className="mb-4 text-4xl font-bold">{details.title}</h2>
        
        <div className="flex items-center gap-4 text-lg">
          <p>평점 ★{details.vote_average.toFixed(1)}</p>
          <span>|</span>
          <p>{details.release_date ? `${details.release_date.split('-')[0]}년` : '-'}</p>
          <span>|</span>
          <p>{details.runtime != null ? `${details.runtime}분` : '-'}</p>
        </div>

        {details.tagline && (
          <p className="mt-4 mb-2 text-2xl italic">"{details.tagline}"</p>
        )}
        
        <p className="w-full md:w-1/2 mt-2 text-md">{details.overview}</p>
      </div>
    </div>
  );
}
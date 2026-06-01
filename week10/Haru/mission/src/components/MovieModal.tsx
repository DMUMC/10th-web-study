
interface MovieModalProps {
  movie: any;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-2xl w-full relative shadow-2xl flex overflow-hidden min-h-96"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-black/40 text-white text-sm font-bold hover:bg-black/60"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="w-74 flex-shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col flex-1 p-5 gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">{movie.title}</h2>
            <p className="text-xs text-gray-400 mt-0.5">영화 · 한국어 · 한국어더빙</p>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-sm font-bold text-gray-800">{movie.vote_average}</span>
            <span className="text-xs text-gray-400">(리뷰 없음)</span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs border-t border-gray-100 pt-3">
            <div>
              <p className="text-gray-400 font-medium mb-0.5">개봉일</p>
              <p className="text-gray-700">{movie.release_date}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium mb-0.5">장르</p>
              <p className="text-gray-700">한국어</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3 flex-1">
            <p className="text-xs text-gray-400 font-medium mb-1.5">줄거리</p>
            <p className="text-xs text-gray-600 leading-relaxed overflow-y-auto max-h-28">
              {movie.overview || '줄거리가 없습니다.'}
            </p>
          </div>

          <div className="flex gap-2 pt-2 border-t border-gray-100">
            
             <a href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-center text-xs font-bold hover:bg-blue-600"
            >
              IMDb에서 검색하기
            </a>
            <button
              onClick={onClose}
              className="px-5 bg-gray-100 text-gray-600 py-2 rounded-lg text-xs font-bold hover:bg-gray-200"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
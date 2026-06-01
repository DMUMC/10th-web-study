import React, { useState } from 'react';
import { axiosClient } from '../apis/axiosClient';
import MovieModal from '../components/MovieModal';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState('ko-KR');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const response = await axiosClient.get('/search/movie', {
        params: {
          query: searchTerm,
          language: language,
          include_adult: includeAdult,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">영화 검색</h1>
      
      <form onSubmit={handleSearch} className="border p-6 rounded shadow-md bg-white">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="영화 제목을 입력하세요"
            className="border p-2 rounded w-full"
          />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeAdult}
                onChange={(e) => setIncludeAdult(e.target.checked)}
              />
              성인 콘텐츠 포함
            </label>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border p-1 rounded"
            >
              <option value="ko-KR">한국어 (ko-KR)</option>
              <option value="en-US">영어 (en-US)</option>
              <option value="ja-JP">일본어 (ja-JP)</option>
            </select>
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">
            검색하기
          </button>
        </div>
      </form>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie: any) => (
          <div 
            key={movie.id} 
            className="border p-2 rounded shadow-sm cursor-pointer hover:shadow-lg"
            onClick={() => navigate(`/movies/${movie.id}`)}
          >
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <h3 className="font-bold text-sm truncate">{movie.title}</h3>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default SearchPage;
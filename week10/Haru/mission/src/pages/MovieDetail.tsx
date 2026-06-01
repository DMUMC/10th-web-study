import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { movieId } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h1>영화 상세 페이지</h1>
      <p>현재 선택한 영화의 ID는: <strong>{movieId}</strong> 입니다.</p>
    </div>
  );
};

export default MovieDetail;
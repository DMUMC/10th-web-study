import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import MovieDetail from './pages/MovieDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/movies/:movieId" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
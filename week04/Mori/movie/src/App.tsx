import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'
import { MovieDetailPage } from './pages/MovieDetailPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/popular" element={<MoviePage category="popular" />} />
        <Route path="/upcoming" element={<MoviePage category="upcoming" />} />
        <Route path="/top-rated" element={<MoviePage category="top_rated" />} />
        <Route path="/now-playing" element={<MoviePage category="now_playing" />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
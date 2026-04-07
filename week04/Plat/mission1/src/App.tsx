import './App.css'
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';
import MainPage from './pages/MainPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: "movies/:category",
        element: <MoviesPage />
      },
      {
        path: 'movies/:category/:movieId',
        element: <MovieDetailPage />
      }
    ],
  },
]);

function App() {
  return  <RouterProvider router={router} />;
}

export default App

import "./App.css";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import NotFound from "./pages/Not-found";
import MoviesPage from "./pages/MoviePage";
import RootLayout from "./layout/root-layout";
import MovieDetailPage from "./pages/MovieDetailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFound />,
    children: [

      {
        path: 'movies/category/:category',
        element: <MoviesPage />,
      },
      {
        path: 'movies/:movieId',
        element: <MovieDetailPage />
      }
    ]
  },

]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

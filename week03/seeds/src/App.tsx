import "./App.css";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import NotFound from "./pages/Not-found";
import MoviesPage from "./pages/Movies";
import RootLayout from "./layout/root-layout";

const router = createBrowserRouter([
  {
    path: '/',
    // element: <HomePage />,
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        // /movies/뒤에 오는 값을 movieId라는 이름으로 받겠다!
        // path: 'movies/:movieId',
        path: 'movies',
        element: <MoviesPage />
      },
    ]
  },

]);

function App() {
  return (
    <RouterProvider router={router} />)
}

export default App;

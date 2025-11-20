import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import NotFoundPage from "./pages/NotFoundPage";
import RootLayout from "./layout/root-layout";
import MovieDetailPage from "./pages/MovieDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movies/:category", element: <MoviePage /> },
    ],
  },
  { path: "movies/:category/:movieId", element: <MovieDetailPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NowStreamingPage from "./pages/NowStreamingPage";
import PopularPage from "./pages/PopularPage";
import RatingPage from "./pages/RatingPage";
import UpcomingPage from "./pages/UpcomingPage";
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
      { path: "popular", element: <PopularPage /> },
      { path: "now-streaming", element: <NowStreamingPage /> },
      { path: "rating", element: <RatingPage /> },
      { path: "upcoming", element: <UpcomingPage /> },
    ],
  },
  { path: "popular/:movieId", element: <MovieDetailPage /> },
  { path: "now-streaming/:movieId", element: <MovieDetailPage /> },
  { path: "rating/:movieId", element: <MovieDetailPage /> },
  { path: "upcoming/:movieId", element: <MovieDetailPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

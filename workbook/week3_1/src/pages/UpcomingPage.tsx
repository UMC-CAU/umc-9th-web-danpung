import { useState, useEffect } from "react";
import type { Movie } from "../types/movie";
import PageButton from "../components/PageButton";
import { LoadingIcon } from "../components/LoadingIcon";
import { ErrorText } from "../components/ErrorText";
import { useNavigate } from "react-router-dom";
const UpcomingPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isloading, setIsloading] = useState(false);
  const [iserror, setIserror] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      setIsloading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY_TOP}`,
              accept: "application/json",
            },
          }
        );
        console.log("state", response.status);
        const result = await response.json();
        setMovies(result.results);
        setMovies(result.results);
        setIsloading(false);
      } catch {
        setIserror(true);
      } finally {
        setIsloading(false);
      }
    };
    fetchMovies();
  }, [page]);
  if (isloading) {
    return <LoadingIcon />;
  }
  if (iserror) {
    return <ErrorText />;
  }
  return (
    <div>
      <div className="flex justify-center mt-6">
        <PageButton page={page} pageChange={setPage} />
      </div>
      <div className="grid grid-cols-6 gap-4 py-10 px-24">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative bg-white rounded-3xl shadow overflow-hidden group"
            onClick={() => navigate(`/upcoming/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:blur"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-center text-white">
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-sm line-clamp-3">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingPage;

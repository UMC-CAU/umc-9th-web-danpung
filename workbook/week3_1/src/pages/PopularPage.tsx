import { useState, useEffect } from "react";
import type { Movie } from "../types/movie";
import { LoadingIcon } from "../components/LoadingIcon";
import { ErrorText } from "../components/ErrorText";
import PageButton from "../components/PageButton";
import { useNavigate } from "react-router-dom";
const PopularPage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isloading, setIsloading] = useState(false);
  const [iserror, setIserror] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchMovies = async () => {
      setIsloading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              accept: "application/json",
            },
          }
        );

        const result = await response.json();

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
            onClick={() => navigate(`/now-streaming/${movie.id}`)}
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

export default PopularPage;

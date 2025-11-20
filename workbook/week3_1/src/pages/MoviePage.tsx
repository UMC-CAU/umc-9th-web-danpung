import { useNavigate } from "react-router-dom";
import { LoadingIcon } from "../components/LoadingIcon";
import { ErrorText } from "../components/ErrorText";
import PageButton from "../components/PageButton";
import useMovies from "../hooks/useMovies";

const MoviePage = () => {
  const navigate = useNavigate();
  const { category, movies, isloading, iserror, page, setPage } = useMovies();
  if (isloading) return <LoadingIcon />;
  if (iserror) return <ErrorText />;

  return (
    <div>
      <div className="flex justify-center mt-6">
        <PageButton page={page} pageChange={setPage} />
      </div>
      <div className="grid grid-cols-6 gap-4 py-10 px-24">
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="relative bg-white rounded-3xl shadow overflow-hidden group"
            onClick={() => navigate(`/movies/${category}/${movie.id}`)}
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

export default MoviePage;

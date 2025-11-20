import useDetail from "../hooks/useDetails";
import { LoadingIcon } from "../components/LoadingIcon";
import { ErrorText } from "../components/ErrorText";

const MovieDetailPage = () => {
  const { movie, cast, isloading, iserror } = useDetail();
  if (isloading) return <LoadingIcon />;
  if (iserror) return <ErrorText />;

  return (
    <div className="p-10">
      <div className="flex gap-10">
        <img
          src={
            movie?.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie?.title}
          className="w-60 rounded-xl object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{movie?.title}</h1>
          <p className="text-gray-600 mb-2">🏃🏻러닝타임: {movie?.runtime}분</p>
          <p className="text-yellow-500 font-bold mb-2">
            ⭐️평점: {movie?.vote_average.toFixed(1)} / 10 ({movie?.vote_count}
            명)
          </p>
          <p className="text-gray-700 leading-relaxed">{movie?.overview}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">감독/출연진</h2>
      <div className="grid grid-cols-5 gap-6">
        {cast.slice(0, 10).map((actor) => (
          <div key={actor.cast_id} className="text-center">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={actor.name}
              className="w-32 h-48 object-cover rounded-lg mx-auto"
            />
            <p className="mt-2 font-medium">{actor.name}</p>
            <p className="text-sm text-gray-500">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetailPage;

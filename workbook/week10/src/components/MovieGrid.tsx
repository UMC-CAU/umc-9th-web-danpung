import { useModal } from "../features/useModal";
import type { TMovie } from "../types/movieType";
import MovieModal from "./MovieModal";

interface MovieGridProps {
  movies: TMovie[];
  isLoading: boolean;
  bottomSkeletonCount?: number;
}

const MovieGrid = ({
  movies,
  isLoading,
  bottomSkeletonCount = 0,
}: MovieGridProps) => {
  const skeletons = Array.from({ length: 8 });
  const bottomSkels = Array.from({ length: bottomSkeletonCount });
  const { isOpen, openModal, selectedMovie, setSelectedMovie } = useModal();

  const handleMovieClick = (movie: TMovie) => {
    setSelectedMovie(movie);
    openModal();
  };

  return (
    <>
      <div className="max-w-6xl mx-auto flex flex-wrap justify-start gap-6 px-6">
        {isLoading
          ? skeletons.map((_, i) => (
              <div
                key={i}
                className="w-48 h-48 bg-gray-200 animate-pulse rounded-lg"
              />
            ))
          : movies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleMovieClick(movie)}
                className="group w-48 h-48 relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://placehold.co/400x400?text=No+Img"
                  }
                  alt={movie.title}
                  className="w-full h-full object-contain"
                />

                <div className="absolute bottom-0 w-full bg-black/60 text-white p-2 opacity-0 group-hover:opacity-100 transition">
                  <h3 className="text-sm font-bold">{movie.title}</h3>
                  <p className="text-xs">평점: {movie.vote_average}</p>
                </div>
              </div>
            ))}

        {bottomSkels.map((_, i) => (
          <div
            key={`bottom-${i}`}
            className="w-48 h-48 bg-gray-200 animate-pulse rounded-lg"
          />
        ))}
      </div>

      {isOpen && selectedMovie && <MovieModal movie={selectedMovie} />}
    </>
  );
};

export default MovieGrid;

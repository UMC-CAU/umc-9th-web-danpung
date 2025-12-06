import { useModal } from "../features/useModal";
import type { TMovie } from "../types/movieType";
import { MdCancel } from "react-icons/md";
interface MovieModalProps {
  movie: TMovie | null;
}

const MovieModal = ({ movie }: MovieModalProps) => {
  const { closeModal } = useModal();
  if (!movie) return null;

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="relative w-200 bg-white rounded-lg shadow-xl p-6 h-140 overflow-y-auto"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-2xl font-bold hover:text-red-500 cursor-pointer"
        >
          <MdCancel />
        </button>

        <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>

        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-50 object-contain rounded-lg mb-4"
          />
        )}

        <p className="text-gray-700 mb-4">{movie.overview}</p>

        <div className="space-y-2">
          <p className="text-lg">
            <span className="font-bold">평점:</span>{" "}
            {movie.vote_average.toFixed(1)}/10
          </p>
          <p className="text-sm">
            <span className="font-bold">개봉일:</span> {movie.release_date}
          </p>
          <p className="text-sm">
            <span className="font-bold">인기도:</span> {movie.popularity}
          </p>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-row gap-10 ">
          <button
            onClick={() => {
              window.open(
                `https://www.imdb.com/find?q=${movie.title}`,
                "_blank"
              );
            }}
            className="w-30 h-10 bg-yellow-500 border text-white font-bold rounded-lg cursor-pointer"
          >
            IMDb에서 검색
          </button>
          <button
            onClick={closeModal}
            className="w-20 h-10 text-blue-500 border border-2 rounded-lg font-bold cursor-pointer"
          >
            닫기
          </button>
        </div>
      </section>
    </div>
  );
};

export default MovieModal;

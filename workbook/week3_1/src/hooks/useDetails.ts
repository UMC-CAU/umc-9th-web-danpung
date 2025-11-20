import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface MovieDetails {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
}

interface Cast {
  cast_id: number;
  name: string;
  character: string;
  profile_path: string | null;
}
function useDetail() {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [isloading, setIsloading] = useState(false);
  const [iserror, setIserror] = useState(false);

  const { movieId } = useParams<{ movieId: string }>();

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      try {
        const fetchMovie = fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              accept: "application/json",
            },
          }
        );
        const fetchCast = fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              accept: "application/json",
            },
          }
        );

        const [movieData, castData] = await Promise.all([
          fetchMovie.then((res) => res.json()),
          fetchCast.then((res) => res.json()),
        ]);

        setMovie(movieData);
        setCast(castData.cast);
      } catch {
        setIserror(true);
      } finally {
        setIsloading(false);
      }
    };
    fetchData();
  }, [movieId]);
  return { movie, cast, isloading, iserror };
}
export default useDetail;

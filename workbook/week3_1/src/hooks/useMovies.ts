import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Movie } from "../types/movie";

const useMovies = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isloading, setIsloading] = useState(false);
  const [iserror, setIserror] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsloading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              accept: "application/json",
            },
          }
        );

        setMovies(response.data.results);
      } catch {
        setIserror(true);
      } finally {
        setIsloading(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  return { category, movies, isloading, iserror, page, setPage };
};

export default useMovies;

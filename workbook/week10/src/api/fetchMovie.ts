import type { TMovieResponse } from "../types/movieType";
import { api } from "./axiosInstance";

export const fetchMovie = async ({
  query,
  includeAdult,
  language,
  pageParam,
}: {
  query: string;
  includeAdult: boolean;
  language: string;
  pageParam: number;
}): Promise<TMovieResponse> => {
  const response = await api.get<TMovieResponse>(`/search/movie`, {
    params: {
      query: query,
      include_adult: includeAdult,
      language: language,
      page: pageParam,
    },
  });
  return response.data;
};

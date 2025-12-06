import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { fetchMovie } from "../api/fetchMovie";
import type { TMovieResponse } from "../types/movieType";
import MovieGrid from "./MovieGrid";
import useMovieStore from "../features/useMovieStore";
import { useThrottleFn } from "../hooks/useThrottle";

const MovieList = () => {
  const { includeAdult, language, searchQuery } = useMovieStore();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery<TMovieResponse>({
    initialPageParam: 1,
    queryKey: ["movies", searchQuery],
    queryFn: ({ pageParam }) =>
      fetchMovie({
        query: searchQuery,
        includeAdult: includeAdult,
        language: language,
        pageParam: pageParam as number,
      }),

    enabled: searchQuery.length > 0,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    getNextPageParam: (lastPage: TMovieResponse) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
  const handleScrollFn = useThrottleFn(() => {
    fetchNextPage();
  }, 2000);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      refetch();
    }
  }, [includeAdult, language, refetch, searchQuery]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        handleScrollFn();
        observer.unobserve(sentinelRef.current!);
        setTimeout(() => {
          if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
          }
        }, 1000);
      }
    });
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [handleScrollFn]);
  const allMovies = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) ?? [];
  }, [data]);

  if (searchQuery.trim() === "") {
    return (
      <div className="mt-16 p-6 text-center text-gray-500">
        영화 제목을 입력하여 검색을 시작하세요.
      </div>
    );
  }
  if (isLoading)
    return (
      <div className="mt-16 p-6">
        <MovieGrid movies={[]} isLoading />
      </div>
    );
  if (isError)
    return (
      <div className="mt-16 p-6 text-center text-red-500">
        데이터를 가져오는 중 오류가 발생했습니다.
        <button
          onClick={() => refetch()}
          className="mt-3 px-4 py-2 bg-yellow-400 text-white rounded"
        >
          재시도
        </button>
      </div>
    );
  return (
    <div className="mt-16 p-6">
      <MovieGrid
        movies={allMovies}
        isLoading={false}
        bottomSkeletonCount={isFetchingNextPage ? 8 : 0}
      />
      <div ref={sentinelRef} style={{ height: 1 }} />
      <div className="py-4 text-center text-gray-500">
        {isFetchingNextPage
          ? "불러오는 중..."
          : hasNextPage
          ? "스크롤을 내리면 더 가져옵니다."
          : "더 이상 데이터가 없어요."}
      </div>
    </div>
  );
};

export default MovieList;

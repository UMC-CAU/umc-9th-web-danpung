import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import api from "../api/axiosInstance";
import LPGrid from "./LPGrid";
import SortButtons from "./SortButtons";
import type { LP } from "../types/LP";

const PAGE_SIZE = 10;

async function fetchLP({
  pageParam = 0,
  order = "desc",
}: {
  pageParam?: number;
  order?: "asc" | "desc";
}) {
  const res = await api.get("/v1/lps", {
    params: { cursor: pageParam, limit: PAGE_SIZE, order },
  });
  if (!res.data.status) throw new Error("데이터 가져오기 실패");
  return {
    data: res.data.data.data as LP[],
    nextCursor: res.data.data.nextCursor,
    hasNext: res.data.data.hasNext,
  };
}

export default function InfiniteLPGrid() {
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["lps", sort],
    queryFn: ({ pageParam = 0 }) => fetchLP({ pageParam, order: sort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  });

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading)
    return (
      <div className="mt-16 p-6">
        <SortButtons sort={sort} setSort={setSort} />
        <LPGrid lps={[]} isLoading />
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

  const allLPs = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="mt-16 p-6">
      <SortButtons sort={sort} setSort={setSort} />
      <LPGrid lps={allLPs} bottomSkeletons={isFetchingNextPage ? 8 : 0} />
      <div ref={sentinelRef} style={{ height: 1 }} />
      <div className="py-4 text-center text-gray-500">
        {isFetchingNextPage
          ? "불러오는 중이에요..."
          : hasNextPage
          ? "아래로 스크롤하면 더 가져와요."
          : "더 이상 데이터가 없어요."}
      </div>
    </div>
  );
}

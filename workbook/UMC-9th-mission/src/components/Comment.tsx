import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import api from "../api/axiosInstance";
import SortButtons from "./SortButtons";
import dayjs from "dayjs";

const PAGE_SIZE = 5;

interface IComment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
}

async function fetchComments({
  lpId,
  pageParam = 0,
  order = "desc",
}: {
  lpId: number;
  pageParam?: number;
  order?: "asc" | "desc";
}) {
  const res = await api.get(`/v1/lps/${lpId}/comments`, {
    params: { cursor: pageParam, limit: PAGE_SIZE, order },
  });
  if (!res.data.status) throw new Error("댓글 가져오기 실패");

  return {
    data: res.data.data.data as IComment[],
    nextCursor: res.data.data.nextCursor,
    hasNext: res.data.data.hasNext,
  };
}

export default function InfiniteComments({ lpId }: { lpId: number }) {
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["comments", lpId, order],
    queryFn: ({ pageParam = 0 }) => fetchComments({ lpId, pageParam, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: !!lpId,
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

  if (isLoading) return <p className="text-gray-400">댓글 불러오는 중...</p>;
  if (isError)
    return (
      <div className="text-center text-red-500">
        댓글 로드 실패 😢
        <button
          onClick={() => refetch()}
          className="mt-2 px-3 py-1 bg-yellow-400 text-white rounded"
        >
          재시도
        </button>
      </div>
    );

  const allComments = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="mt-6">
      <SortButtons sort={order} setSort={setOrder} />
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="댓글을 입력하세요."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition">
          등록
        </button>
      </div>

      <div className="space-y-4">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="border-b pb-3 animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                    <div className="w-24 h-4 bg-gray-300 rounded" />
                  </div>
                  <div className="w-16 h-3 bg-gray-300 rounded" />
                </div>
                <div className="mt-2 w-full h-4 bg-gray-300 rounded" />
                <div className="mt-1 w-5/6 h-4 bg-gray-300 rounded" />
              </div>
            ))
          : allComments.map((c) => (
              <div key={c.id} className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        c.author.avatar ||
                        "https://placehold.co/40x40?text=No+Img"
                      }
                      alt={c.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="font-medium">{c.author.name}</p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {dayjs(c.createdAt).fromNow()}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{c.content}</p>
              </div>
            ))}
      </div>

      <div ref={sentinelRef} className="h-4" />
      <div className="py-2 text-center text-gray-500">
        {isFetchingNextPage
          ? "불러오는 중..."
          : hasNextPage
          ? "스크롤하면 더 불러와요"
          : "모든 댓글을 불러왔습니다"}
      </div>
    </div>
  );
}

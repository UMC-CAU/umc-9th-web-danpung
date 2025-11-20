import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import LPGrid from './LPGrid';
import SortButtons from './SortButtons';
import { useDebounce } from '../hooks/useDebounce';
import { fetchLP } from '../api/LpApi';
import { useThrottleFn } from '../hooks/useThrottingFn';
export default function InfiniteLPGrid({ searchTerm }: { searchTerm: string }) {
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');

  const debouncedSearch = useDebounce(searchTerm ?? '', 300);
  const isSearching = debouncedSearch.trim().length > 0;
  const handleScrollFn = useThrottleFn(() => {
    fetchNextPage();
  }, 2000);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['lps', debouncedSearch, sort],
    queryFn: ({ pageParam = 0 }) =>
      fetchLP({
        pageParam,
        search: isSearching ? debouncedSearch : undefined,
        order: sort,
      }),

    initialPageParam: 0,
    enabled: true,

    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,

    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  });

  const sentinelRef = useRef<HTMLDivElement | null>(null);

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
          ? '불러오는 중...'
          : hasNextPage
            ? '스크롤을 내리면 더 가져옵니다.'
            : '더 이상 데이터가 없어요.'}
      </div>
    </div>
  );
}

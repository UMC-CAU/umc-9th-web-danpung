import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import LPGrid from "./LPGrid";
import SortButtons from "./SortButtons";
import type { LP } from "../types/LP";

interface IFind {
  search?: string;
  order?: "asc" | "desc";
  limit?: number;
}

const fetchLPs = async ({ search = "", order = "desc", limit = 20 }: IFind) => {
  const res = await api.get("/v1/lps", { params: { search, order, limit } });
  if (!res.data.status) throw new Error("데이터 가져오기 실패");
  return res.data.data.data as LP[];
};

const Finding = ({ searchTerm }: { searchTerm: string }) => {
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const {
    data: lps,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["lps", searchTerm, sort],
    queryFn: () => fetchLPs({ search: searchTerm, order: sort }),
    staleTime: 5000,
    gcTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: true,
  });

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

  return (
    <div className="mt-16 p-6">
      <SortButtons sort={sort} setSort={setSort} />
      {lps && lps.length > 0 ? (
        <LPGrid lps={lps} />
      ) : (
        <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default Finding;

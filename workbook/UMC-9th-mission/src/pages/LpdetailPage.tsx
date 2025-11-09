import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import LpContent from "../components/LPMain";
import LpComments from "../components/Comment";

const LpdetailPage = () => {
  const { id } = useParams<{ id: string }>();

  // 상세 정보 불러오기
  const { data, isPending, isError } = useQuery({
    queryKey: ["lp", id],
    queryFn: () => api.get(`/v1/lps/${id}`).then((res) => res.data),
    enabled: !!id, // id 없을 때 요청 방지
  });

  if (isPending) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다 😢</div>;

  const lp = data.data;

  return (
    <div className="flex justify-center py-10">
      <div className="flex flex-col w-[800px] bg-white rounded-2xl shadow-lg p-8">
        {/* 1️⃣ LP 본문 */}
        <LpContent lp={lp} />

        {/* 2️⃣ 구분선 */}
        <hr className="my-8 border-gray-200" />

        {/* 3️⃣ 댓글 */}
        <LpComments lpId={lp.id} />
      </div>
    </div>
  );
};

export default LpdetailPage;

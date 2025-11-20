import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

interface UserData {
  id: number;
  name: string;
  email: string;
  bio?: string | null;
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
}

const UsermePage = () => {
  const [user, setUser] = useState<UserData | null>(null);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/v1/users/me");
      console.log("사용자 데이터:", res.data);
      setUser(res.data.data);
    } catch (error) {
      console.error("사용자 데이터 호출 실패:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">내 정보</h1>

      <button
        onClick={fetchUser}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        사용자 데이터 다시 불러오기
      </button>

      {user ? (
        <div className="space-y-2 mb-8">
          <p>아이디: {user.id}</p>
          <p>이메일: {user.email}</p>
          <p>닉네임: {user.name}</p>
        </div>
      ) : (
        <p>사용자 데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default UsermePage;

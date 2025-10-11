import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoogleRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
    } else {
      alert("로그인 실패");
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return <p>로그인 중...</p>;
};

export default GoogleRedirectPage;

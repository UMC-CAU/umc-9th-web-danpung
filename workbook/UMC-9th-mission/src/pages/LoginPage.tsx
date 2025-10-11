import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { login } from "../api/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import GoogleButton from "../components/GoogleButton";
const schema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z
    .string()
    .min(6, { message: "비밀번호는 6자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const [setAccessToken] = useLocalStorage("accessToken");
  const [setRefreshToken] = useLocalStorage("refreshToken");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await login(data.email, data.password);
      setAccessToken(result.data.accessToken);
      setRefreshToken(result.data.refreshToken);

      console.log("로그인 성공:", result);
      alert("로그인 성공");
      navigate("/");
    } catch (error: any) {
      console.log("로그인 실패", error.response?.data || error.message);
      alert("로그인 실패");
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col gap-4 items-center w-80 p-6 bg-white rounded-2xl shadow-md"
      >
        <div className="flex items-center justify-center w-full">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute left-4 font-bold text-xl"
          >
            &lt;
          </button>
          <h1 className="font-bold text-2xl">로그인</h1>
        </div>

        <input
          {...register("email")}
          placeholder="이메일을 입력하세요"
          className="w-60 border rounded border-gray-400 box-border px-2 py-2 focus:border-green-500 outline-none"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <div className="relative w-60">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력하세요"
            className="w-full border rounded border-gray-400 box-border px-2 py-2 focus:border-green-500 outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
          >
            {showPassword ? "🕶️" : "👓"}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          disabled={!isValid || isSubmitting}
          type="submit"
          className={`border rounded w-60 h-8 text-white transition ${
            !isValid || isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-700"
          }`}
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>

        <hr className="w-full mt-2" />
        <GoogleButton />
      </form>
    </div>
  );
};

export default LoginPage;

import useForm from "../hooks/\buseForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {
    inputs,
    handleChange,
    handleSubmit,
    handlePassword,
    showPassword,
    islogin,
    okid,
    okps,
  } = useForm();
  const backPage = useNavigate();

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-4 items-center w-100"
      >
        <div className="flex">
          <button
            type="button"
            onClick={() => backPage("/")}
            className="absolute left-4 font-bold text-xl"
          >
            &lt;
          </button>
          <h1 className="font-bold text-2xl">로그인</h1>
        </div>

        <input
          name="ID"
          value={inputs.ID || ""}
          onChange={handleChange}
          placeholder="아이디를 입력하세요"
          className="w-60 h-1 border rounded border-gray-500 box-border px-2 py-3 focus:border-green-500 outline-none"
        />
        {okid && (
          <p className="text-red-500 text-sm">
            올바른 이메일 형식을 입력해주세요.
          </p>
        )}
        <div className="relative w-60">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={inputs.password || ""}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            className="w-full h-1 border rounded border-gray-500 box-border px-2 py-3 focus:border-green-500 outline-none pr-10"
          />
          <button
            type="button"
            onClick={handlePassword}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
          >
            {showPassword ? "🕶️" : "👓"}
          </button>
        </div>
        {okps && (
          <p className="text-red-500 text-sm">
            비밀번호는 6자리 이상이어야 합니다.
          </p>
        )}
        <button
          disabled={!islogin}
          type="submit"
          className={`border rounded border-none w-60 h-8 text-white ${
            islogin ? "bg-green-500 hover:bg-green-700" : "bg-gray-400"
          }`}
        >
          로그인
        </button>

        <hr className="w-full" />
      </form>
    </div>
  );
};

export default LoginPage;

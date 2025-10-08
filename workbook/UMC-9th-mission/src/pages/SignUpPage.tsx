import { useState } from "react";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import profileImg from "../assets/profile.webp";

const SignUpPage = () => {
  const {
    inputs,
    okid,
    okps,
    islogin,
    handleChange,
    handlePassword,
    showPassword,
  } = useForm();

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchError, setMatchError] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (okid || !inputs.ID) {
        alert("올바른 이메일을 입력해주세요.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (okps || !inputs.password) {
        alert("비밀번호를 6자리 이상 입력해주세요.");
        return;
      }
      if (inputs.password !== confirmPassword) {
        setMatchError(true);
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!inputs.nickName) return;
      alert(`회원가입 완료!\n이메일: ${inputs.ID}\n닉네임: ${inputs.nickName}`);
      navigate("/");
    }
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setMatchError(value.length > 0 && value !== inputs.password);
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-50">
      <form
        onSubmit={handleNext}
        className="relative flex flex-col gap-4 items-center w-80 p-6 bg-white rounded-2xl shadow-md"
      >
        <div className="flex items-center justify-center w-full">
          <button
            type="button"
            onClick={() => (step === 1 ? navigate("/") : setStep(1))}
            className="absolute left-4 font-bold text-xl"
          >
            &lt;
          </button>
          <h1 className="font-bold text-2xl">회원가입</h1>
        </div>
        {step === 1 && (
          <div className="flex flex-col items-center">
            <input
              name="ID"
              value={inputs.ID || ""}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              className="w-60 border rounded border-gray-500 box-border px-2 py-2 mb-3 focus:border-green-500 outline-none"
            />
            {okid && (
              <p className="text-red-500 text-sm">
                올바른 이메일 형식을 입력해주세요.
              </p>
            )}
            <button
              type="submit"
              disabled={okid || !inputs.ID}
              className={`border rounded border-none w-60 h-8 text-white 
    ${okid || !inputs.ID ? "bg-gray-400" : "bg-green-500 hover:bg-green-700"}
  `}
            >
              다음
            </button>
          </div>
        )}

        {step === 2 && (
          <>
            <div className="flex justify-center text-gray-700 text-sm w-60 text-left">
              <span className="font-semibold text-gray-500">✉️{inputs.ID}</span>
            </div>

            <div className="relative w-60">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={inputs.password || ""}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                className="w-full border rounded border-gray-500 box-border px-2 py-2 focus:border-green-500 outline-none pr-10"
              />
              <button
                type="button"
                onClick={handlePassword}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                {showPassword ? "🕶️" : "👓"}
              </button>
            </div>

            <div className="relative w-60">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmChange}
                placeholder="비밀번호를 다시 입력하세요"
                className="w-full border rounded border-gray-500 box-border px-2 py-2 focus:border-green-500 outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                {showConfirmPassword ? "🕶️" : "👓"}
              </button>
            </div>

            {okps && (
              <p className="text-red-500 text-sm">
                비밀번호는 6자리 이상이어야 합니다.
              </p>
            )}
            {matchError && (
              <p className="text-red-500 text-sm">
                비밀번호가 일치하지 않습니다.
              </p>
            )}

            <button
              type="submit"
              disabled={!islogin || matchError}
              className={`border rounded w-60 h-8 text-white
    ${
      !islogin || matchError
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-700"
    }
  `}
            >
              다음
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <img
              src={profileImg}
              alt="프로필 이미지"
              className="size-40 rounded-full mb-3"
            />
            <input
              type="text"
              name="nickName"
              value={inputs.nickName || ""}
              onChange={handleChange}
              placeholder="닉네임을 입력하세요"
              className="w-60 border rounded border-gray-500 box-border px-2 py-2 focus:border-green-500 outline-none pr-10 "
            />
            <button
              type="submit"
              disabled={!inputs.nickName}
              className={`border rounded w-60 h-8 text-white
    ${
      !inputs.nickName
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-700"
    }
  `}
            >
              회원가입 완료
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignUpPage;

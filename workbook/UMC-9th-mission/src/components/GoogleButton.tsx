import Logo from "../assets/googleLogo.png";
const GoogleButton = () => {
  const handleGoogleButton = () => {
    window.location.href =
      "https://umc-web.kyeoungwoon.kr/v1/auth/google/login";
  };
  return (
    <button
      type="button"
      onClick={handleGoogleButton}
      className="flex items-center justify-center gap-2 w-60 h-10 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
    >
      <img src={Logo} alt="구글 로고" className="size-5" />
      구글 로그인
    </button>
  );
};

export default GoogleButton;

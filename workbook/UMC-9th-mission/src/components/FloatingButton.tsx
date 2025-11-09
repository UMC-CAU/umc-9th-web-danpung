import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FloatingButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("v1/lps");
  };
  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8
    bg-yellow-400 hover:bg-yellow-500
    hover:scale-110
    text-white rounded-full shadow-lg
    w-14 h-14 flex items-center justify-center
    transition-all duration-200"
    >
      <Plus size={28} />
    </button>
  );
};
export default FloatingButton;

import type { LP } from "../types/LP";
import { useNavigate } from "react-router-dom";

interface LPGridProps {
  lps: LP[];
  isLoading?: boolean;
  bottomSkeletons?: number;
}

const LPGrid = ({
  lps,
  isLoading = false,
  bottomSkeletons = 0,
}: LPGridProps) => {
  const skeletons = Array.from({ length: 8 });
  const bottomSkels = Array.from({ length: bottomSkeletons });
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto flex flex-wrap justify-start gap-6 px-6">
      {isLoading
        ? skeletons.map((_, i) => (
            <div
              key={i}
              className="w-48 h-48 rounded-lg shadow-md bg-gray-200 animate-pulse overflow-hidden"
            >
              <div className="w-full h-32 bg-gray-300" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-3 bg-gray-300 rounded w-1/2" />
                <div className="h-3 bg-gray-300 rounded w-1/4" />
              </div>
            </div>
          ))
        : lps.map((lp) => (
            <div
              key={lp.id}
              onClick={() => navigate(`/lp/${lp.id}`)}
              className="group w-48 h-48 relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 w-full p-3 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-sm font-bold truncate">{lp.title}</h4>
                <p className="text-xs">
                  {new Date(lp.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs">❤️ {lp.likes.length}</p>
              </div>
            </div>
          ))}

      {bottomSkels.map((_, i) => (
        <div
          key={`bottom-${i}`}
          className="w-48 h-48 rounded-lg shadow-md bg-gray-200 animate-pulse overflow-hidden"
        >
          <div className="w-full h-32 bg-gray-300" />
          <div className="p-3 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-3 bg-gray-300 rounded w-1/2" />
            <div className="h-3 bg-gray-300 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LPGrid;

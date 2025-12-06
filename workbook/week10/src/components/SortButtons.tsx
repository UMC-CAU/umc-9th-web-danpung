import useSortStore from "../features/useSortStore";

const SortButtons = () => {
  const { order, setOrder } = useSortStore();

  return (
    <div className="flex gap-3">
      <button
        className={`px-3 py-1 rounded 
          ${
            order === "popular"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }
        `}
        onClick={() => setOrder("popular")}
      >
        조회순
      </button>

      <button
        className={`px-3 py-1 rounded 
          ${
            order === "rating"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }
        `}
        onClick={() => setOrder("rating")}
      >
        평점순
      </button>
    </div>
  );
};

export default SortButtons;

interface SortButtonsProps {
  sort: "asc" | "desc";
  setSort: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}

const SortButtons = ({ sort, setSort }: SortButtonsProps) => {
  return (
    <div className="flex justify-end mb-4 gap-2">
      <button
        onClick={() => setSort("desc")}
        className={`px-4 py-2 rounded ${
          sort === "desc" ? "bg-yellow-400 text-white" : "bg-gray-200"
        }`}
      >
        최신순
      </button>
      <button
        onClick={() => setSort("asc")}
        className={`px-4 py-2 rounded ${
          sort === "asc" ? "bg-yellow-400 text-white" : "bg-gray-200"
        }`}
      >
        오래된순
      </button>
    </div>
  );
};

export default SortButtons;

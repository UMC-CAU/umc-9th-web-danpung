interface IPage {
  page: number;
  pageChange: (newPage: number) => void;
}
const PageButton = ({ page, pageChange }: IPage) => {
  return (
    <div className="flex items-center gap-4">
      <button onClick={() => pageChange(page - 1)} disabled={page === 1}>
        ⬅️
      </button>
      <span className="text-2xl font-bold">{page} 페이지</span>
      <button onClick={() => pageChange(page + 1)} disabled={page === 4}>
        ➡️
      </button>
    </div>
  );
};

export default PageButton;

export const LoadingIcon = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 animate-spin rounded-full border-6 border-t-transparent">
        <span className="sr-only">로딩중</span>
      </div>
    </div>
  );
};

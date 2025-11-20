export default function CommentSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border-b pb-3 animate-pulse">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div className="h-4 w-24 bg-gray-300 rounded" />
            </div>

            <div className="h-3 w-16 bg-gray-300 rounded" />
          </div>

          <div className="mt-3 h-4 w-full bg-gray-300 rounded" />
        </div>
      ))}
    </div>
  );
}

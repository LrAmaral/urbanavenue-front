export function SkeletonProduct() {
  return (
    <div className="space-y-4 h-72 w-48 md:h-40 animate-pulse">
      <div className="bg-gray-300 h-40 w-full md:h-24"></div>
      <div className="bg-gray-300 h-6 w-3/4"></div>
      <div className="bg-gray-300 h-6 w-1/2"></div>
    </div>
  );
}

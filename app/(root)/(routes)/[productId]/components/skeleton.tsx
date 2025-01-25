const Skeleton = () => (
  <div className="animate-pulse flex flex-col md:flex-row items-start justify-center space-y-6 md:space-y-0 md:space-x-8">
    <div className="md:w-1/2 flex h-full items-center justify-center">
      <div className="w-full h-[400px] bg-gray-300 rounded-lg"></div>
    </div>
    <div className="flex flex-col w-full md:w-1/2 md:text-left space-y-4">
      <div className="space-y-1">
        <div className="w-3/4 h-8 bg-gray-300 rounded-md"></div>
        <div className="w-1/2 h-6 bg-gray-300 rounded-md"></div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="w-full h-10 bg-gray-300 rounded-md"></div>
        <div className="w-full h-6 bg-gray-300 rounded-md"></div>
      </div>
      <div className="w-full h-10 bg-gray-300 rounded-md"></div>
      <div className="w-full h-24 bg-gray-300 rounded-md"></div>
      <div className="mt-6 p-4 border rounded-lg bg-gray-50 shadow-sm">
        <div className="w-3/4 h-6 bg-gray-300 rounded-md"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded-md mt-2"></div>
      </div>
    </div>
  </div>
);

export default Skeleton;

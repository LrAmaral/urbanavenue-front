import { Wrapper } from "@/components/Custom/wrapper";

const SkeletonPage = () => {
  return (
    <div className="w-full h-auto mt-24 flex flex-col items-center">
      <Wrapper className="w-full flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div className="w-32 h-6 bg-gray-300 animate-pulse rounded"></div>
          <div className="w-24 h-6 bg-gray-300 animate-pulse rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] w-full gap-4 items-start">
          <div className="bg-white space-y-4 p-4 w-full h-fit border rounded-lg">
            <div className="w-48 h-6 bg-gray-300 animate-pulse rounded"></div>
            <div className="flex gap-4 items-center">
              <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-full"></div>
              <div className="w-32 h-6 bg-gray-300 animate-pulse rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-300 animate-pulse rounded"></div>
              <div className="w-3/4 h-4 bg-gray-300 animate-pulse rounded"></div>
              <div className="w-2/3 h-4 bg-gray-300 animate-pulse rounded"></div>
              <div className="w-1/2 h-4 bg-gray-300 animate-pulse rounded"></div>
            </div>
          </div>

          <div className="bg-white p-4 border w-full rounded-lg">
            <div className="w-48 h-6 bg-gray-300 animate-pulse rounded mb-4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2, 3].map((_, idx) => (
                <div
                  key={idx}
                  className="p-2 border border-gray-300 rounded-lg space-y-2"
                >
                  <div className="w-3/4 h-4 bg-gray-300 animate-pulse rounded"></div>
                  <div className="w-2/3 h-4 bg-gray-300 animate-pulse rounded"></div>
                  <div className="w-1/2 h-4 bg-gray-300 animate-pulse rounded"></div>
                  <div className="flex space-x-2">
                    <div className="w-6 h-6 bg-gray-300 animate-pulse rounded"></div>
                    <div className="w-6 h-6 bg-gray-300 animate-pulse rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default SkeletonPage;

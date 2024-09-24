"use client";

import { Wrapper } from "@/components/Custom/wrapper";

interface SkeletonProps {
  height: string;
}

interface LoaderProps {
  h: string;
}

const SkeletonProduct = ({ height }: SkeletonProps) => {
  return (
    <div
      className={`w-full bg-gray-200 animate-pulse rounded-lg`}
      style={{ height }}
    />
  );
};

export default function Loading({ h }: LoaderProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Wrapper className="mt-24 md:mt-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center items-center lg:grid-cols-3 gap-0 md:gap-40">
          {[...Array(6)].map((_, index) => (
            <SkeletonProduct key={index} height={h} />
          ))}
        </div>
      </Wrapper>
    </div>
  );
}

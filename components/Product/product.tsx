"use client";

import type { Product as ProductType } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductProps {
  data?: ProductType;
  isLoading?: boolean;
}

export function Product({ data, isLoading }: ProductProps) {
  const router = useRouter();

  const handleClick = () => {
    if (!isLoading && data) {
      router.push(`/${data.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center mt-4 justify-center text-center space-y-4 w-full animate-pulse">
        <div className="w-full h-[100px] md:h-[400px] bg-gray-300 rounded-lg"></div>
        <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
        <div className="w-2/4 md:w-1/4 h-5 bg-gray-300 rounded"></div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      key={data?.id}
      className="flex flex-col items-center justify-center text-center cursor-pointer space-y-4 w-full"
    >
      <div className="w-full relative">
        <Image
          src={data?.images?.[0]?.url || ""}
          alt={data?.title || "Loading..."}
          width={400}
          height={400}
          layout="responsive"
          objectFit="cover"
          className="rounded-lg"
          loading="lazy"
        />
      </div>
      <p className="font-semibold text-sm sm:text-md">{data?.title}</p>
      <p className="text-sm sm:text-md lg:text-lg">
        R$ {data?.price?.toFixed(2).replace(".", ",")}
      </p>
    </div>
  );
}

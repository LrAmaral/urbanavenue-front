"use client";

import type { Product } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductView {
  data: Product;
}

export function Product({ data }: ProductView) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${data?.id}`);
  };

  return (
    <div
      onClick={handleClick}
      key={data.id}
      className="flex flex-col items-center justify-center text-center cursor-pointer space-y-4 w-full"
    >
      <div className="w-full relative">
        <Image
          src={data?.images?.[0]?.url}
          alt={data.title}
          width={400}
          height={400}
          layout="responsive"
          objectFit="cover"
          className="rounded-lg"
          loading="lazy"
        />
      </div>
      <p className="font-semibold text-sm sm:text-md">{data.title}</p>
      <p className="text-sm sm:text-md lg:text-lg">
        R$ {data.price.toFixed(2).replace(".", ",")}
      </p>
    </div>
  );
}

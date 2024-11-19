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
      className="flex flex-col items-center justify-center text-center cursor-pointer space-y-4 h-[500px] w-96 md:w-64 md:h-48"
    >
      <Image
        src={data?.images?.[0]?.url}
        alt={data.title}
        width={340}
        height={340}
        loading="lazy"
        className="object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
      />
      <p className="font-semibold text-md">{data.title}</p>
      <p className="text-lg">R$ {data.price.toFixed(2).replace(".", ",")}</p>
    </div>
  );
}

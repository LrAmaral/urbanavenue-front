"use client";

import { Product } from "@/app/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductView {
  data: Product;
}

export function Product({ data }: ProductView) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/shop/${data?.id}`);
  };

  return (
    <div
      onClick={handleClick}
      key={data.id}
      className="space-y-4 h-80 w-64 md:h-48 cursor-pointer text-sm"
    >
      <Image
        src={data?.images?.[0]?.url}
        alt="product"
        width={300}
        height={264}
        className=" hover:scale-105 ease-in-out transition-all"
      />
      <p className="font-medium text-lg">{data.title}</p>
      <p className="font-semibold text-lg">${data.price}</p>
    </div>
  );
}

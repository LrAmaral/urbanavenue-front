"use client";

import type { Product } from "@/lib/product";
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
      className="space-y-4 md:space-y-1  text-center h-80 w-64 md:h-48 cursor-pointer text-sm"
    >
      <Image
        src={data?.images?.[0]?.url}
        alt="product"
        width={360}
        height={360}
        loading="lazy"
        className=" hover:scale-105 ease-in-out transition-all"
      />
      <p className="font-semibold">{data.title}</p>
      <p className="text-lg">R${data.price}</p>
    </div>
  );
}

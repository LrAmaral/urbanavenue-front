import { Product } from "@/types/product"
import Image from "next/image"
import React from "react"

interface ProductView {
  data: Product
}

export function Product({ data }: ProductView) {
  return (
    <div key={data.id} className="space-y-4 h-72 w-48 md:h-40 cursor-pointer">
      <Image
        src={data?.images?.[0]?.url}
        alt="product"
        width={300}
        height={264}
      />
      <p className="font-medium text-sm">{data.title}</p>
      <p className="font-bold">${data.price}</p>
    </div>
  );
}

"use client";

import { Product } from "@/components/Product/product";
import { Product as ProductType } from "@/lib/types";

interface ProductGridProps {
  products: ProductType[];
  isLoading?: boolean;
}

export default function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 justify-items-center items-center lg:grid-cols-3 gap-16">
        {Array.from({ length: 6 }).map((_, index) => (
          <Product key={index} isLoading={true} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="grid grid-cols-2 justify-items-center items-center lg:grid-cols-3 gap-16">
      {products.map((product) => (
        <Product key={product.id} data={product} />
      ))}
    </div>
  );
}

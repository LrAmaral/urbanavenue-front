import { Product } from "@/components/Product/product";

interface ProductGridProps {
  products: any[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:mt-20 sm:grid-cols-2 justify-items-center items-center lg:grid-cols-3 gap-0 md:gap-40">
      {products.map((product) => (
        <Product key={product.id} data={product} />
      ))}
    </div>
  );
}

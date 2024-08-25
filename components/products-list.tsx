import getProducts from "@/app/api/get-products";
import { Product } from "@/components/product";
import { Loader } from "./ui/loader";

export async function ProductList() {
  const products = await getProducts({ isFeatured: true });

  return (
    <div className="flex flex-col justify-center items-center mt-28 h-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center md:grid-cols-3 lg:grid-cols-4 gap-40">
        {products.map((item) =>
          products.length === 0 ? (
            <Loader key={item.id} />
          ) : (
            <Product key={item.id} data={item} />
          )
        )}
      </div>
    </div>
  );
}

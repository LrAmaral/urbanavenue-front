import getProducts from "@/app/api/get-products";
import { Product } from "@/components/Product/product";
import { Loader } from "../ui/loader";

export async function ProductList() {
  const products = await getProducts({ isFeatured: true });

  return (
    <div className="flex flex-col justify-center items-center h-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center lg:grid-cols-3 sm:gap-36 md:gap-60">
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

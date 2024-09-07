import { Wrapper } from "@/components/Custom/wrapper";
import getProducts from "../api/get-products";
import { Loader } from "lucide-react";
import { Product } from "@/components/Product/product";

export default async function Home() {
  const products = await getProducts({ isFeatured: true });

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Wrapper className="my-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center items-center lg:grid-cols-3 gap-40">
          {products.length === 0 ? (
            <Loader key="loading" />
          ) : (
            products.map((item) => <Product key={item.id} data={item} />)
          )}
        </div>
      </Wrapper>
    </div>
  );
}

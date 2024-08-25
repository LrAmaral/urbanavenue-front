import { ProductList } from "@/components/products-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "shop | UrbanAvenue®",
  description: "Shop Page",
};

const Shop = async () => {
  return (
    <div className="w-full flex flex-col h-auto items-center justify-center">
      <div className="max-w-[76.875rem] mx-auto xs:px-6 px-8">
        <ProductList />
      </div>
    </div>
  );
};

export default Shop;

import { ProductList } from "@/components/Product/products-list";
import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "shop | UrbanAvenue®",
  description: "Shop Page",
};

const Shop = async () => {
  return (
    <div className="w-full flex flex-col gap-4 h-auto items-center justify-center">
      <div className="w-full max-w-[76.875rem] mx-auto xs:px-4 px-6 py-4 mt-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-lg">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/user" className="text-lg">
                Shop
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="max-w-[76.875rem] mx-auto xs:px-4 px-6 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <h2 className="text-xl font-bold mb-4">Categorias</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-lg text-gray-600 hover:text-black">
                T-shirts
              </a>
            </li>
            <li>
              <a href="#" className="text-lg text-gray-600 hover:text-black">
                Pants
              </a>
            </li>
            <li>
              <a href="#" className="text-lg text-gray-600 hover:text-black">
                Hoodies
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full lg:w-3/4">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Shop;

import getProduct from "@/app/api/get-product";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ClientModal } from "./components/client-modal";
import { Wrapper } from "@/components/wrapper";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const PageProduct: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);

  if (!product) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <p className="text-xl font-semibold text-gray-700">
          Product not found.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mt-20 h-full flex flex-col items-center justify-start py-8 px-4 md:px-0">
      <Wrapper>
        <div className="text-lg py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-lg">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/shop" className="text-lg">
                  Shop
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/products/${params.productId}`}
                  className="text-lg"
                >
                  {product.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-col md:flex-row h-full w-full items-center justify-center p-8 space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2 h-full flex items-center justify-center">
            <Image
              src={product.images[0]?.url || "/placeholder-image.png"}
              alt={`Image of ${product.title}`}
              width={600}
              height={600}
              objectFit="cover"
              className="rounded-lg hover:scale-105 transition-all ease-in-out cursor-pointer"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 items-center md:items-start text-center md:text-left space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">
              {product.title}
            </h1>
            <p className="text-lg text-gray-500">
              Size: {product.size?.name || "N/A"}
            </p>
            <p className="text-3xl font-semibold text-zinc-900">
              ${product.price}
            </p>
            <button className="px-6 py-3 w-full bg-zinc-900 text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors ease-in-out">
              Add to Cart
            </button>
            <div className="flex justify-between w-full gap-10 items-center">
              <div className="">
                <p className="text-start">Location and prize</p>
                <input
                  type="text"
                  className="px-0.5 py-1"
                  placeholder="Write your ZIP Code"
                />
              </div>
              <button className="px-6 py-3 bg-zinc-900 text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors ease-in-out">
                Calculate
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
      <ClientModal imageUrl={product.images[0]?.url} />
    </div>
  );
};

export default PageProduct;

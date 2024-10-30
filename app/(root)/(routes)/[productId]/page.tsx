import getProduct from "@/app/api/get-product";
import { ClientModal } from "./components/client-modal";
import { Wrapper } from "@/components/Custom/wrapper";

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
    <div className="max-md:mt-20 mt-28 flex flex-col items-center justify-start">
      <Wrapper className="">
        <div className="flex flex-col md:flex-row items-start justify-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="md:w-1/2 flex h-full items-center justify-center">
            <ClientModal imageUrl={product.images[0]?.url} />
          </div>
          <div className="flex flex-col w-full md:w-1/2 md:text-left space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl md:text-3xl font-bold text-gray-800">
                {product.title}
              </h2>
              <p className="text-lg md:text-2xl font-semibold text-zinc-900">
                R$ {product.price}
              </p>
            </div>
            <p className="text-sm md:text-md text-gray-500">
              Size: {product.size?.name || "N/A"}
            </p>
            <button className="button-animated">
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default PageProduct;

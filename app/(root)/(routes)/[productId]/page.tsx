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
    <div className="mt-20 flex w-[90%] md:w-full flex-col items-center justify-start py-8 px-4 md:px-0">
      <Wrapper>
        <div className="flex flex-col md:flex-row items-start justify-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="md:w-1/2 flex h-full items-center justify-center">
            <ClientModal imageUrl={product.images[0]?.url} />
          </div>
          <div className="flex flex-col w-full md:w-1/2 md:text-left space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl md:text-3xl font-bold text-gray-800">
                {product.title}
              </h2>
              <p className="text-lg md:text-2xl font-semibold text-zinc-900">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <p className="text-sm md:text-md text-gray-500">
              Size: {product.size?.name}
            </p>
            <button className="px-6 py-3 w-full bg-zinc-900 text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors ease-in-out">
              Add to Cart
            </button>
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 items-center">
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
    </div>
  );
};

export default PageProduct;

import getProduct from "@/app/api/get-product";
import Image from "next/image";

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
    <div className="flex flex-col md:flex-row h-screen w-full md:w-3/4 items-center justify-center mx-auto p-8 space-y-6 md:space-y-0 md:space-x-8">
      <div className="w-full md:w-1/2 h-full flex items-center justify-center">
        <Image
          src={product.images[0]?.url || "/placeholder-image.png"}
          alt={`Image of ${product.title}`}
          width={600}
          height={600}
          objectFit="cover"
          className="rounded-lg hover:scale-105 transition-all ease-in-out hover:cursor-pointer"
        />
      </div>
      <div className="flex flex-col w-full md:w-1/2 items-center md:items-start text-center md:text-left space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>
        <p className="text-2xl font-semibold text-gray-600">${product.price}</p>
        <p className="text-lg text-gray-500">
          Size: {product.size?.name || "N/A"}
        </p>
        <button className="mt-6 px-6 py-3 bg-zinc-700 text-white font-bold rounded-lg hover:bg-zinc-900 transition-colors ease-in-out">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PageProduct;

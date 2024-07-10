import getProduct from "@/app/api/get-product";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const PageProduct: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);

  if (!product) {
    return null;
  }

  return (
    <div className="flex w-full items-center h-screen justify-center">
      {product.title}
    </div>
  );
};

export default PageProduct;

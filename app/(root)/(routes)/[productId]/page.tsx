import getProduct from "@/app/api/get-product";
import { Wrapper } from "@/components/Custom/wrapper";
import ProductDetails from "./components/product-details";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const PageProduct: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);

  return (
    <div className="mt-20 flex w-[90%] md:w-full flex-col items-center justify-start py-8 px-4 md:px-0">
      <Wrapper>
        <ProductDetails product={product} />
      </Wrapper>
    </div>
  );
};

export default PageProduct;

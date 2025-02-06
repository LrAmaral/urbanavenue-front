"use client";

import { useEffect, useState } from "react";
import getProduct from "@/app/api/get-product";
import { Wrapper } from "@/components/Custom/wrapper";
import ProductDetails from "./components/product-details";
import { Product } from "@/lib/types";
import Skeleton from "./components/skeleton";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const PageProduct: React.FC<ProductPageProps> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProduct(params.productId);
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [params.productId]);

  return (
    <div className="mt-20 flex w-[90%] md:w-full h-auto flex-col items-center justify-start py-8 px-4 md:px-0">
      <Wrapper>
        {loading ? <Skeleton /> : <ProductDetails product={product!} />}
      </Wrapper>
    </div>
  );
};

export default PageProduct;

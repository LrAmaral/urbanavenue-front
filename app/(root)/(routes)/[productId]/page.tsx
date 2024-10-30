"use client";

import { useState } from "react";
import axios from "axios";
import { ClientModal } from "./components/client-modal";
import { Wrapper } from "@/components/Custom/wrapper";
import SizeSelector from "./components/size-selector";
import { Size, SizeOption } from "@/lib/product";

interface ProductClientProps {
  product: {
    id: string;
    title: string;
    price: string;
    size: Size[];
    images: { url: string }[];
  };
}

const ProductClient: React.FC<ProductClientProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);

  const handleSizeSelect = async (size: SizeOption) => {
    setSelectedSize(size);

    const response = await axios.get(`/api/check-stock`, {
      params: {
        productId: product.id,
        size,
      },
    });

    if (response.data.stock === 0) {
      alert("Esse tamanho está fora de estoque.");
    }
  };

  const sizes: Size[] = product.size || [];

  return (
    <div className="max-md:mt-20 mt-28 flex flex-col items-center justify-start">
      <Wrapper>
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
              Tamanho: {selectedSize || "N/A"}
            </p>
            <SizeSelector sizes={sizes} onSelect={handleSizeSelect} />
            <button className="button-animated">
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ProductClient;

"use client";

import { useState } from "react";
import { ClientModal } from "./client-modal";

interface ProductDetailsProps {
  product: {
    id: string;
    title: string;
    price: number;
    images: { url: string }[];
    productSizes: { size: { id: string; name: string }; stock: number }[];
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(
    product.productSizes?.[0]?.size.id || ""
  );
  const [stock, setStock] = useState(
    product.productSizes.find((size) => size.size.id === selectedSize)?.stock ||
      0
  );

  const handleSizeChange = (sizeId: string) => {
    setSelectedSize(sizeId);
    const selectedSizeObj = product.productSizes.find(
      (size) => size.size.id === sizeId
    );
    setStock(selectedSizeObj?.stock || 0);
  };

  return (
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

        <div className="flex flex-col space-y-2">
          <label className="text-sm text-gray-600">Size</label>
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedSize}
            onChange={(e) => handleSizeChange(e.target.value)}
          >
            {product.productSizes?.length ? (
              product.productSizes.map((size) => (
                <option key={size.size.id} value={size.size.id}>
                  {size.size.name}
                </option>
              ))
            ) : (
              <option disabled>No sizes available</option>
            )}
          </select>
          <p className="text-sm text-gray-500">
            {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
          </p>
        </div>

        <button
          className="px-6 py-3 w-full bg-zinc-900 text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors ease-in-out"
          disabled={stock === 0}
        >
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
  );
};

export default ProductDetails;

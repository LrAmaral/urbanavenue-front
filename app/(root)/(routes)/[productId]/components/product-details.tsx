"use client";

import { useState } from "react";
import { useCart } from "@/providers/cart-context";
import EmblaCarousel from "@/components/ui/embla-carousel";
import Image from "next/image";
import { ClientModal } from "./client-modal";
import toast from "react-hot-toast";

interface ProductDetailsProduct {
  id: string;
  title: string;
  price: number;
  images: { url: string }[];
  productSizes: { size: { id: string; name: string }; stock: number }[];
}

interface ProductDetailsProps {
  product: ProductDetailsProduct;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { addItemToCart } = useCart();

  const firstAvailableSize =
    product.productSizes.find((size) => size.stock > 0) ||
    product.productSizes[0];

  const [selectedSize, setSelectedSize] = useState(
    firstAvailableSize?.size || { id: "", name: "" }
  );
  const [stock, setStock] = useState(firstAvailableSize?.stock || 0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSizeChange = (sizeId: string) => {
    const selectedSizeObj = product.productSizes.find(
      (size) => size.size.id === sizeId
    );
    if (selectedSizeObj) {
      setSelectedSize(selectedSizeObj.size);
      setStock(selectedSizeObj.stock);
    }
  };

  const handleAddToCart = () => {
    if (stock > 0) {
      addItemToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        imageUrl: product.images[currentImageIndex]?.url || "",
        size: { ...selectedSize, stock },
      });

      toast.success("Item added to cart!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-center space-y-6 md:space-y-0 md:space-x-8">
      <div className="md:w-1/2 flex h-full items-center justify-center">
        <EmblaCarousel
          options={{ align: "center", loop: true }}
          onSlideChange={setCurrentImageIndex}
        >
          {product.images?.map((image, index) => (
            <div
              className="embla__slide w-full h-full flex justify-center items-center"
              key={index}
            >
              <ClientModal imageUrl={image.url}>
                <Image
                  src={image.url}
                  alt={`Product Image ${index + 1}`}
                  width={800}
                  height={800}
                  className="w-full h-auto object-cover rounded-lg cursor-pointer"
                />
              </ClientModal>
            </div>
          ))}
        </EmblaCarousel>
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
            value={selectedSize.id}
            onChange={(e) => handleSizeChange(e.target.value)}
          >
            {product.productSizes.map((size) => (
              <option
                key={size.size.id}
                value={size.size.id}
                disabled={size.stock === 0}
              >
                {size.size.name} {size.stock === 0 ? "(Out of Stock)" : ""}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500">
            {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
          </p>
        </div>

        <button
          onClick={() => {
            if (stock > 0) {
              handleAddToCart();
            } else {
              toast.dismiss();
              toast.error("Out of stock! Cannot add more.");
            }
          }}
          className="px-6 py-3 w-full bg-zinc-900 text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors ease-in-out"
          disabled={stock === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

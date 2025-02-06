import { useState } from "react";
import { useCart } from "@/providers/cart-context";
import EmblaCarousel from "@/components/ui/embla-carousel";
import Image from "next/image";
import toast from "react-hot-toast";
import { Product } from "@/lib/types";
import tshirt from "../../../../../../public/assets/images/tshirt-size.jpg";
import pants from "../../../../../../public/assets/images/pants-size.jpg";
import hoodies from "../../../../../../public/assets/images/hoodie-size.jpg";
import shorts from "../../../../../../public/assets/images/shorts-size.jpg";

interface ProductDetailsProps {
  product: Product;
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
      if (
        selectedSizeObj.size.id !== selectedSize.id ||
        selectedSizeObj.stock !== stock
      ) {
        setSelectedSize(selectedSizeObj.size);
        setStock(selectedSizeObj.stock);
      }
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

  const categoryImages: { [key: string]: string } = {
    "T-shirt": tshirt.src,
    Pants: pants.src,
    Hoodies: hoodies.src,
    Shorts: shorts.src,
  };

  const measureImage = categoryImages[product.category.name] || tshirt;

  return (
    <div className="flex flex-col md:flex-row items-start justify-center space-y-6 md:space-y-0 md:space-x-8">
      <div className="md:w-1/2 flex h-full items-center justify-center">
        {product.images?.length === 1 ? (
          <div className="w-full h-full flex justify-center items-center">
            <Image
              src={product.images[0].url}
              alt={`Product Image ${product.images[0].url}`}
              width={800}
              height={800}
              className="w-full h-auto pointer-events-none object-cover rounded-lg"
            />
          </div>
        ) : (
          <EmblaCarousel
            options={{
              align: "center",
              loop: true,
              draggable: true,
            }}
            onSlideChange={setCurrentImageIndex}
          >
            {product.images?.map((image, index) => (
              <div
                className="w-full h-full flex justify-center items-center"
                key={index}
              >
                <Image
                  src={image.url}
                  alt={`Product Image ${image.url}`}
                  width={800}
                  height={800}
                  className="w-full h-auto object-cover rounded-lg cursor-pointer"
                />
              </div>
            ))}
          </EmblaCarousel>
        )}
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

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Description</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.desc}
          </p>
        </div>

        <div className="mt-6 p-4 border rounded-lg bg-gray-50 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Available Payment Methods
          </h3>
          <ul className="list-disc ml-6 text-gray-600 space-y-1">
            <li>Credit Card (Visa, MasterCard)</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mt-6">Measures</h3>
          <Image
            src={measureImage}
            alt="measures"
            width={440}
            height={440}
            className="pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

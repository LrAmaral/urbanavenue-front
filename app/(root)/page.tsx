"use client";

import { useState, useEffect } from "react";
import { Wrapper } from "@/components/Custom/wrapper";
import getProducts from "../api/get-products";
import Filter from "@/components/Filter/filter";
import ProductGrid from "@/components/product-grid";
import BackToTopButton from "@/components/back";
import { Product as ProductType } from "@/lib/types";

interface HomeProps {
  searchParams: {
    category?: string;
    sort?: string;
    size?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export default function Home({ searchParams }: HomeProps) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const selectedCategory = searchParams.category || "All";
  const selectedSort = searchParams.sort || "default";
  const selectedSize = searchParams.size || "All";
  const minPrice = parseFloat(searchParams.minPrice || "0");
  const maxPrice = parseFloat(searchParams.maxPrice || "Infinity");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const products = await getProducts({ isFeatured: true });
        setProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const uniqueCategories = Array.from(
    new Set(products.map((item) => item.category.name))
  );
  const categories = ["All", ...uniqueCategories];

  const uniqueSizes = Array.from(
    new Set(
      products.flatMap((product) =>
        product.productSizes.map((productSize) => productSize.size.name)
      )
    )
  );
  const sizes = ["All", ...uniqueSizes];

  const filteredProducts = products
    .filter((product) =>
      selectedCategory === "All"
        ? true
        : product.category.name === selectedCategory
    )
    .filter((product) =>
      selectedSize === "All"
        ? true
        : product.productSizes.some(
            (productSize) => productSize.size.name === selectedSize
          )
    )
    .filter(
      (product) =>
        product.price >= minPrice &&
        (maxPrice === Infinity || product.price <= maxPrice)
    );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === "price_asc") {
      return a.price - b.price;
    }
    if (selectedSort === "price_desc") {
      return b.price - a.price;
    }
    if (selectedSort === "best_selling") {
      return b.sales - a.sales;
    }
    if (selectedSort === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Wrapper className="mt-24">
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          selectedSort={selectedSort}
          sizes={sizes}
          selectedSize={selectedSize}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
        <ProductGrid isLoading={isLoading} products={sortedProducts} />
        <BackToTopButton />
      </Wrapper>
    </div>
  );
}

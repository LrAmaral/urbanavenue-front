"use client";

import { Wrapper } from "@/components/Custom/wrapper";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import searchProducts from "@/app/api/search";
import { Loader } from "@/components/ui/loader";
import ProductGrid from "@/components/Product/product-grid";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        setLoading(true);
        try {
          const products = await searchProducts(query);
          setResults(products);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="text-gray-800 bg-white w-full min-h-screen">
      <Wrapper className="mt-24 md:mt-32 flex flex-col items-start justify-start w-full">
        {results.length > 0 && (
          <p className="flex items-center justify-start mt-6 md:mt-0 mb-2 h-full w-full font-semibold text-lg md:text-xl">
            {`Results for "${query}"`}
          </p>
        )}
        {loading ? (
          <div className="flex h-screen w-full justify-center items-center text-xl font-semibold">
            <Loader />
          </div>
        ) : results.length > 0 ? (
          <div className="flex flex-col items-start w-full">
            <div className="flex flex-wrap gap-6 w-full justify-start">
              <ProductGrid products={results} />
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center text-lg md:text-xl font-semibold">
            No results found for &quot;{query}&quot;.
          </div>
        )}
      </Wrapper>
    </div>
  );
}

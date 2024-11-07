"use client";

import { Wrapper } from "@/components/Custom/wrapper";
import { Product as ProductComponent } from "@/components/Product/product";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import searchProducts from "@/app/api/search";

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
          console.error("Erro ao buscar produtos:", error);
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
    <div className="text-gray-800">
      <Wrapper className="mt-24 md:mt-40 flex min-h-screen flex-col gap-6 text-center">
        {loading ? (
          <p>Loading results...</p>
        ) : results.length > 0 ? (
          <>
            <h1 className="text-base font-semibold sm:mt-0 sm:text-xl">
              {`Resultados para "${query}"`}
            </h1>
            <div className="flex flex-wrap gap-4 justify-center">
              {results.map((product) => (
                <ProductComponent key={product.id} data={product} />
              ))}
            </div>
          </>
        ) : (
          <p>Nenhum resultado encontrado para &quot;{query}&quot;</p>
        )}
      </Wrapper>
    </div>
  );
}

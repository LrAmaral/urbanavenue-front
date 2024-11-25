"use client";

import { useState } from "react";

interface FilterProps {
  categories: string[];
  selectedCategory: string;
  selectedSort: string;
  sizes: string[];
  selectedSize: string;
  minPrice: number;
  maxPrice: number;
}

export default function Filter({
  categories,
  selectedCategory,
  selectedSort,
  sizes,
  selectedSize,
  minPrice,
  maxPrice,
}: FilterProps) {
  const [priceRange, setPriceRange] = useState({
    minPrice: minPrice.toString(),
    maxPrice: maxPrice.toString(),
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleApplyPriceFilter = () => {
    const params = new URLSearchParams(window.location.search);
    params.set("minPrice", priceRange.minPrice);
    params.set("maxPrice", priceRange.maxPrice);
    window.location.search = params.toString();
  };

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm p-2 bg-zinc-800 text-white rounded-md shadow-md"
        >
          {isExpanded ? "Hide Filters" : "Show Filters"}
        </button>
      </div>
      {isExpanded && (
        <div className="w-full flex flex-col md:flex-row gap-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-white mt-4">
          <div className="flex flex-col gap-4 w-full md:w-1/3">
            <h3 className="text-lg font-semibold">Filter by:</h3>
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                className="border border-gray-300 rounded-md p-2"
                value={selectedCategory}
                onChange={(e) => {
                  const params = new URLSearchParams(window.location.search);
                  params.set("category", e.target.value);
                  window.location.search = params.toString();
                }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="size" className="text-sm font-medium">
                Size
              </label>
              <select
                id="size"
                className="border border-gray-300 rounded-md p-2"
                value={selectedSize}
                onChange={(e) => {
                  const params = new URLSearchParams(window.location.search);
                  params.set("size", e.target.value);
                  window.location.search = params.toString();
                }}
              >
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-1/3">
            <h3 className="text-lg font-semibold">Sort by:</h3>
            <div className="flex flex-col gap-2">
              <label htmlFor="sort" className="text-sm font-medium">
                Sort Options
              </label>
              <select
                id="sort"
                className="border border-gray-300 rounded-md p-2"
                value={selectedSort}
                onChange={(e) => {
                  const params = new URLSearchParams(window.location.search);
                  params.set("sort", e.target.value);
                  window.location.search = params.toString();
                }}
              >
                <option value="default">Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="best_selling">Best Selling</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-1/3">
            <h3 className="text-lg font-semibold">Price Range:</h3>
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <label htmlFor="minPrice" className="text-sm font-medium">
                  Min Price
                </label>
                <input
                  type="number"
                  id="minPrice"
                  className="border border-gray-300 rounded-md p-2 w-24"
                  value={priceRange.minPrice}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      minPrice: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="maxPrice" className="text-sm font-medium">
                  Max Price
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  className="border border-gray-300 rounded-md p-2 w-24"
                  value={priceRange.maxPrice}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      maxPrice: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <button
              onClick={handleApplyPriceFilter}
              className="bg-zinc-800 text-white rounded-md px-2 py-1 mt-2 text-sm"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

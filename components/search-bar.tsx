"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { Eraser, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import Link from "next/link";

interface SearchBarProps {
  classname?: string;
}

export default function SearchBar({ classname }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const MAX_RECENT_SEARCHES = 5;
  const MAX_DISPLAYED_SUGGESTIONS = 5;

  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = () => {
      setLoading(true);
      const availableSuggestions = [
        "T-shirt",
        "Shorts",
        "Jacket",
        "Sneakers",
        "Socks",
        "Hoodie",
        "Jeans",
        "Backpack",
        "Cap",
        "Pants",
        "Boots",
        "Watch",
        "Leggings",
        "Raincoat",
        "Pajamas",
      ];
      const filteredSuggestions = availableSuggestions.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setLoading(false);
    };

    const timeoutId = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const saveRecentSearch = (query: string) => {
    let updatedSearches = [...recentSearches];

    updatedSearches = updatedSearches.filter((search) => search !== query);
    updatedSearches.unshift(query);

    if (updatedSearches.length > MAX_RECENT_SEARCHES) {
      updatedSearches = updatedSearches.slice(0, MAX_RECENT_SEARCHES);
    }

    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      saveRecentSearch(searchTerm);
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setIsDialogOpen(false);
    }
  };

  const handleRemoveRecentSearches = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    saveRecentSearch(suggestion);
    router.push(`/search?query=${encodeURIComponent(suggestion)}`);
    setIsDialogOpen(false);
  };

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger asChild>
        <motion.div
          onClick={() => setIsDialogOpen(true)}
          className={`${classname} relative flex cursor-pointer items-center rounded-full border border-zinc-400 p-2 md:p-3`}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          <Search size={18} className="text-zinc-500" />
        </motion.div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 ease-out data-[state=open]:opacity-100" />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0, y: -50 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
          className="fixed inset-0 z-50 flex max-h-full items-start justify-center overflow-y-auto bg-white p-4 max-md:p-0"
        >
          <Dialog.Content className="flex max-h-full w-1/2 flex-col overflow-y-auto rounded-lg bg-white p-4 max-sm:w-full">
            <Dialog.Title className="sr-only">Search products</Dialog.Title>
            <form onSubmit={handleSubmit} className="flex w-full flex-col">
              <div className="relative flex w-full items-center justify-center border-b border-gray-400 pt-0 max-sm:pt-6">
                <Search size={24} className="text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search for brand, model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-4 pl-4 pr-10 text-lg outline-none"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 text-zinc-500 hover:text-zinc-700"
                  >
                    <Eraser size={24} className="cursor-pointer" />
                  </button>
                )}
              </div>
              {loading && (
                <p className="mt-2 text-center text-zinc-500">Searching...</p>
              )}
              {suggestions.length > 0 && (
                <ul className="mt-4 max-h-40 overflow-auto">
                  {suggestions
                    .slice(0, MAX_DISPLAYED_SUGGESTIONS)
                    .map((suggestion, index) => (
                      <li
                        key={index}
                        className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  {suggestions.length > MAX_DISPLAYED_SUGGESTIONS && (
                    <li className="py-2 px-4 text-center text-blue-500 cursor-pointer">
                      Ver todos
                    </li>
                  )}
                </ul>
              )}
              {recentSearches.length > 0 && (
                <ul className="mt-4 max-h-80 overflow-auto">
                  <div className="flex justify-between">
                    <span className="font-medium">Searched recently</span>
                    <button
                      type="button"
                      onClick={handleRemoveRecentSearches}
                      className="border px-6"
                    >
                      Clean
                    </button>
                  </div>
                  {recentSearches.map((search, index) => (
                    <li key={index}>
                      <Dialog.Close asChild>
                        <Link
                          href={`/search?query=${search}`}
                          className="flex cursor-pointer items-center gap-2.5 py-4 hover:bg-gray-100"
                        >
                          <Search size={18} />
                          {search}
                        </Link>
                      </Dialog.Close>
                    </li>
                  ))}
                </ul>
              )}
            </form>
            <Dialog.Close className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-600">
              <X size={28} />
            </Dialog.Close>
          </Dialog.Content>
        </motion.div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <>
      {isMobile ? (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <div className="flex items-center cursor-pointer p-2">
              <Search size={20} className="text-zinc-400" />
            </div>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            <Dialog.Content className="fixed inset-0 flex items-center justify-center bg-white p-4">
              <form onSubmit={handleSubmit} className="flex w-full flex-col">
                <input
                  type="text"
                  placeholder="Search by brand, model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-4 text-2xl md:text-lg outline-none"
                />
              </form>
              <Dialog.Close className="absolute right-4 top-4">X</Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex items-center rounded-full border border-zinc-300 bg-white px-4 py-2"
        >
          <Search size={20} className="text-zinc-400" />
          <input
            type="text"
            placeholder="Search by brand, model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent p-1 pl-4 text-sm text-zinc-700 placeholder-zinc-400 outline-none"
          />
        </form>
      )}
    </>
  );
}

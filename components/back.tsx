"use client";

import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={handleScrollToTop}
        className="fixed bottom-4 right-4 z-20 p-3 rounded-full bg-zinc-800 text-white hover:bg-zinc-600 transition"
      >
        <ArrowUp />
      </button>
    )
  );
}

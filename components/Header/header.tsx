"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { User2 } from "lucide-react";
import Link from "next/link";
import CartSheet from "../Cart/cart-sheet";
import HamburguerButton from "./components/hamburguer-button";
import { Wrapper } from "../Custom/wrapper";
import { pages } from "@/lib/pages";
import { motion } from "framer-motion";
import { mobileLinkVars } from "@/lib/mobile-vars";

export const MainNav = () => {
  const { user } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-10 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-white h-20 py-2 shadow-lg" : "bg-white h-24 py-4"
      }`}
    >
      <Wrapper className="h-full flex justify-between items-center">
        <div className="flex gap-8 items-center justify-between w-full mx-4">
          <div className="flex gap-4 flex-row-reverse md:flex-row items-center justify-end md:justify-between w-full">
            <Link
              href={"/"}
              className="font-extrabold text-2xl md:text-3xl font-sans"
            >
              UrbanAvenue
            </Link>
            <div className="flex gap-4 md:gap-16 items-center">
              <div className="hidden md:flex gap-6">
                {pages.map(({ id, label, href }) => (
                  <motion.div key={id} variants={mobileLinkVars}>
                    <Link
                      href={href}
                      className="hover:text-neutral-400 md:text-lg text-2xl transition ease-in-out  text-black font-semibold"
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <HamburguerButton />
            </div>
          </div>
          <div className="flex justify-center items-center gap-3">
            {user ? (
              <Link href={"/user"}>
                <User2 />
              </Link>
            ) : (
              <Link href={"/sign-in"}>
                <User2 />
              </Link>
            )}
            <CartSheet />
          </div>
        </div>
      </Wrapper>
    </nav>
  );
};

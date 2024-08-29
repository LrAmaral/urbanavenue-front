"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { User2 } from "lucide-react";
import Link from "next/link";
import CartSheet from "../Cart/cart-sheet";
import HamburguerButton from "./components/hamburguer-button";
import WebLinks from "./components/web-links";
import { Wrapper } from "../wrapper";

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
        isScrolled ? "bg-white h-16 py-2" : "bg-white h-24 py-4"
      }`}
    >
      <Wrapper className="h-full flex justify-between items-center">
        <div className="flex gap-8 items-center justify-between w-full">
          <div className="flex gap-4 flex-row-reverse md:flex-row items-center justify-end md:justify-between w-full">
            <Link
              href={"/"}
              className="font-extrabold text-2xl md:text-3xl font-sans"
            >
              UrbanAvenue
            </Link>
            <div className="flex gap-4 md:gap-16 items-center">
              <WebLinks />
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

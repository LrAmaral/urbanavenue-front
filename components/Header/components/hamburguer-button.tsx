"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";

import { pages } from "@/lib/pages";
import Link from "next/link";
import {
  mobileLinkVars,
  containerVars,
  menuVars,
} from "../../../lib/mobile-vars";

const HamburguerButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const setResize = () =>
      innerWidth >= 768 && menuOpen ? setMenuOpen(false) : null;

    window.addEventListener("resize", setResize);
  }, [menuOpen]);

  return (
    <div className="flex justify-between w-full md:hidden">
      <m.button
        animate={menuOpen ? "open" : "closed"}
        onClick={toggleMenu}
        aria-label="Botão Hamburguer"
        className="flex flex-col space-y-1 justify-center scale-150 z-10"
      >
        <m.span
          variants={{
            closed: { width: 16, rotate: 0, y: 0 },
            open: { width: 20, rotate: 45, y: 5 },
          }}
          className="w-5 h-px bg-black block"
        />
        <m.span
          variants={{
            closed: {
              x: 0,
              width: 12,
              transition: { duration: 0.7 },
            },
            open: {
              x: -45,
              transition: { duration: 0.4 },
            },
          }}
          className="w-5 h-px bg-black block"
        />
        <m.span
          variants={{
            closed: { width: 8, rotate: 0, y: 0 },
            open: { width: 20, rotate: -45, y: -5 },
          }}
          className="h-px bg-black block"
        />
      </m.button>
      <AnimatePresence>
        {menuOpen && (
          <m.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed md:hidden left-0 origin-top top-0 bg-white w-full h-screen flex items-center justify-center"
          >
            <m.div
              onClick={toggleMenu}
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="gap-20 flex flex-col justify-center items-center text-lg"
            >
              {pages.map(({ id, label, href }) => (
                <m.div key={id} variants={mobileLinkVars}>
                  <Link
                    href={href}
                    className="hover:text-neutral-400 md:text-lg text-2xl transition ease-in-out  text-black font-semibold"
                  >
                    {label}
                  </Link>
                </m.div>
              ))}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburguerButton;

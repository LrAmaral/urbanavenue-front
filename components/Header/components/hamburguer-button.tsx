"use client";

import { AnimatePresence, motion } from "framer-motion";
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  return (
    <div className="flex justify-between w-full z-50 md:hidden">
      <motion.button
        animate={menuOpen ? "open" : "closed"}
        onClick={toggleMenu}
        aria-label="Botão Hamburguer"
        className="flex flex-col space-y-1 justify-center scale-150 z-50"
      >
        <motion.span
          variants={{
            closed: { width: 16, rotate: 0, y: 0 },
            open: { width: 20, rotate: 45, y: 5 },
          }}
          className="w-5 h-px bg-black block"
        />
        <motion.span
          variants={{
            closed: { x: 0, width: 12, transition: { duration: 0.7 } },
            open: { x: -45, transition: { duration: 0.4 } },
          }}
          className="w-5 h-px bg-black block"
        />
        <motion.span
          variants={{
            closed: { width: 8, rotate: 0, y: 0 },
            open: { width: 20, rotate: -45, y: -5 },
          }}
          className="h-px bg-black block"
        />
      </motion.button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed md:hidden left-0 origin-top top-0 bg-white w-full h-screen flex justify-start px-4"
          >
            <motion.div
              onClick={toggleMenu}
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="gap-6 flex flex-col mt-24 text-lg"
            >
              {pages.map(({ id, label, href }) => (
                <motion.div key={id} variants={mobileLinkVars}>
                  <Link
                    href={href}
                    className="hover:text-neutral-400 md:text-lg text-2xl transition ease-in-out text-black font-semibold"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburguerButton;

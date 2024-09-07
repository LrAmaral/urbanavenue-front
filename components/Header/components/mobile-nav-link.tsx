"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MobileNavLinkProps {
  href: string;
  label: string;
  className: string;
}

const mobileLinkVars = {
  initial: {
    y: "-80vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0, 0.55, 0.45, 1],
    },
  },
};

const MobileNavLink = ({ href, label, className }: MobileNavLinkProps) => {
  return (
    <motion.div variants={mobileLinkVars}>
      <Link
        href={href}
        className={cn(
          "hover:text-neutral-400 md:text-lg text-2xl transition ease-in-out",
          className
        )}
      >
        {label}
      </Link>
    </motion.div>
  );
};

export default MobileNavLink;

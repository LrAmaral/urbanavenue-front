"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { mobileLinkVars } from "@/app/utils/mobileLinkVars";
import { cn } from "@/lib/utils";

interface MobileNavLinkProps {
  href: string;
  label: string;
  className: string;
}

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

"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0.95 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.08,
        ease: "linear",
      }}
    >
      {children}
    </motion.div>
  );
}

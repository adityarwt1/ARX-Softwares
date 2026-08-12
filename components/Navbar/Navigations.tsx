"use client";

import { navigations } from "@/constants/navbar/navigations";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

const Navigations: React.FC = () => {
  const pathname = usePathname();
  const isRoot = pathname === "/";

  return (
    <ol className="flex text-zinc-950 font-extralight gap-15 justify-center items-center w-full">
      {navigations.map((navs, index) => (
        <motion.li
          key={navs.href}
          initial={isRoot ? { x: 200, opacity: 0 } : undefined}
          animate={isRoot ? { x: 0, opacity: 1 } : undefined}
          transition={{
            duration: isRoot ? 0.5 : 0,
            delay: isRoot ? 0.1 * index : 0,
          }}
        >
          <Link title={navs.title} href={navs.href}>
            {navs.title}
          </Link>
        </motion.li>
      ))}
    </ol>
  );
};

export default Navigations;
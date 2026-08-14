"use client";

import { navigations } from "@/constants/navbar/navigations";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

const Navigations: React.FC = () => {
  const pathname = usePathname();
  const isRoot = pathname === "/";

  return (
    <ol className="hidden md:flex text-zinc-950 font-extralight gap-15 justify-center items-center w-full ">
      {navigations.map((navs, index) => (
        <motion.li
          key={navs.href}
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
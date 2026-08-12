'use client'
import React from "react";
import { motion } from 'motion/react'
import { moreOptions, navigations } from "@/constants/navbar/navigations";
import Link from "next/link";
const MoreOptionsSections: React.FC = () => {
    return (
        <motion.div
            className="bg-[#D9D9D9] w-full h-24 border border-zinc-950/15  overflow-hidden flex flex-col justify-center items-center"
            initial={{height:0}}
            animate={{height:56}}
            exit={{height:0}}
            transition={{duration:0.5}}
        >
            <ol className="flex flex-row justify-start items-center text-zinc-950 gap-10 w-full px-5 overflow-y-scroll scrollbar-none">
            <div className="md:hidden flex flex-row justify-start items-center text-zinc-950 gap-10">
                
            {navigations.map((moreOptions, index)=>(
                <li key={index + moreOptions.title} >
                    <Link href={moreOptions.href} title={moreOptions.title}>{moreOptions.title}</Link>
                </li>
            ))}
            </div>

            {moreOptions.map((moreOptions, index)=>(
                <li key={index + moreOptions.title} >
                    <Link href={moreOptions.href} title={moreOptions.title}>{moreOptions.title}</Link>
                </li>
            ))}
            </ol>
        </motion.div>
    )
}

export default MoreOptionsSections

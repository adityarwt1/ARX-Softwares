import ButtonRedirect from "@/components/ui/Buttons/ButtonRedirect";
import React from "react";
import { motion } from "motion/react"
const HeroLeftSections: React.FC = () => {
    return (
        <div className="w-[30%] text-7xl uppercase font-extrabold wrap-normal  text-left items-start flex flex-col justify-center">
            {"Solving Real world Problems!".split(" ").map((words, index) => (
                <motion.span key={index + "_" + words} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5, delay: 0.5 * index}}>{words}</motion.span>
            ))}
            <div className="flex justify-start gap-5 w-full">
                <ButtonRedirect title="Products" href="/products" />
                <ButtonRedirect title="About" href="/about" />
            </div>
        </div>
    )
}

export default HeroLeftSections
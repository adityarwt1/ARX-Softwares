import ButtonRedirect from "@/components/ui/Buttons/ButtonRedirect";
import React from "react";
import { motion } from "motion/react"
import Image from "next/image";
const HeroLeftSections: React.FC = () => {
    return (
        <div className="w-[30%] text-7xl uppercase font-extrabold wrap-normal  text-left items-start flex flex-col justify-center">
            <div className="flex items-center">
                <Image src={"/Arx_svg_WithoutBackground.svg"} alt="Arx-Software logo!" width={100} height={100} className="[&_*]:fill-zinc-950" style={{filter: "brightness(0)"}}/>
                <span className="text-4xl">Softwares</span>
            </div>
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
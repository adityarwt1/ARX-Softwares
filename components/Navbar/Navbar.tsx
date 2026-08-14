"use client"
import React, { useState } from "react";
import Navigations from "@/components/Navbar/Navigations";
import Logo from "@/components/Navbar/LogoSections";
import { Menu, X } from 'lucide-react'
import MoreOptionsSections from "@/components/Navbar/MoreOptionsSections";
import { AnimatePresence } from "motion/react"
const Navbar_Main_Wrapper: React.FC = () => {
    const [showMore, setShowMore] = useState<boolean>(false)
    const handleShowMore = () => setShowMore(!showMore)
    return (
        <>
            <nav className="flex flex-col justify-between items-center bg-[#D9D9D9] w-full h-12 px-4 py-2">
                <div className="flex justify-between items-center w-full h-auto">
                    {/* Logo sections */}
                    <Logo />
                    {/* middle section of the  */}
                    <Navigations />
                    {/* right more options */}
                    <div className="w-full flex justify-end">
                    {!showMore && <Menu color="#09090b" onClick={handleShowMore} /> || showMore && <X color="#09090b" onClick={handleShowMore} />}
                    </div>
                </div>
            </nav>
                <AnimatePresence>
                    {showMore && <MoreOptionsSections />}
                </AnimatePresence>
        </>
    )
}

export default Navbar_Main_Wrapper
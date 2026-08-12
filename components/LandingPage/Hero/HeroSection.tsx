import React from "react";
import HeroRightSection from "./HeroRightSection";
import HeroLeftSections from "./HeroLeftSection";

const HeroSection : React.FC = ()=>{
    return (
        <div className="flex md:flex-row flex-col bg-[#D9D9D9] w-full h-screen border-t border-zinc-950 px-4">
            <HeroLeftSections/>
            <HeroRightSection/>
        </div>
    )
}

export default HeroSection
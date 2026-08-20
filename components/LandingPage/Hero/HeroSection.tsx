import React from "react";
import HeroRightSection from "./HeroRightSection";
import HeroLeftSections from "./HeroLeftSection";

interface HeroSectionSectoinsInterfaces {
    children:React.ReactNode
}

interface HeorComponentProps extends React.FC<HeroSectionSectoinsInterfaces> {
    HeroleftSection:typeof HeroLeftSections, 
    HeroRightSection: typeof HeroRightSection

}
const HeroSection : HeorComponentProps = ({children})=>{
    return (
        <div className="flex md:flex-row flex-col bg-[#D9D9D9] w-full h-screen border-t border-zinc-950 px-4">
            {children}
        </div>
    )
}

HeroSection.HeroleftSection = HeroLeftSections
HeroSection.HeroRightSection = HeroRightSection;
export default HeroSection
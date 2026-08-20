"use client"

import React from "react"
import HeroSection from "./Hero/HeroSection"

interface LandingPageOrHomePageInterface {
    children: React.ReactNode
}

interface LandingPageComponent
    extends React.FC<LandingPageOrHomePageInterface> {
    HeroSection: typeof HeroSection
}

const LandingPageOrHomePageMainWrapper: LandingPageComponent = ({
    children,
}) => {
    return (
        <div className="flex flex-col justify-center items-center">
            {children}
        </div>
    )
}

LandingPageOrHomePageMainWrapper.displayName = "Landing Page"
LandingPageOrHomePageMainWrapper.HeroSection = HeroSection

export default LandingPageOrHomePageMainWrapper
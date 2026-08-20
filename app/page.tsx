"use client"
import React from "react"
import LandingPage from "@/components/LandingPage/LandingPageOrHomePageMainWrapper"
const Landing_Page = () => {
  return (
    <LandingPage>
      <LandingPage.HeroSection>
        <LandingPage.HeroSection.HeroleftSection/>
        <LandingPage.HeroSection.HeroRightSection/>
      </LandingPage.HeroSection>
    </LandingPage>
  )
}

  export default Landing_Page
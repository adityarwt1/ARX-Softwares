"use client"
import homePageMotions from "@/motions/homePage/homepageMotion"
import homePageCss from "@/styles/HomePage/homePageCss"
import { motion } from "motion/react"
import React, { useState } from "react"
const HomePage = ()=>{
  const [isAnimating, setIsAnimating] = useState(false)

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={homePageMotions}
      onAnimationStart={() => setIsAnimating(true)}
      onAnimationComplete={() => setIsAnimating(false)}
      className={`${homePageCss.mainWrapper} ${isAnimating ? "overflow-hidden" : ""}`}
    >
      <img
        src="/Arx_svg_WithoutBackground.svg"
        alt="ARX Softwares logo"
        className={homePageCss.logo}
      />
      <h1 className={homePageCss.headingText}>ARX Softwares</h1>
      <p className={homePageCss.tagline}>
        Shipping unbeatable, sustainable software products.
      </p>
      <p className={homePageCss.description}>
        We build software with relentless focus on reliability, speed, and long-term value.
      </p>
    </motion.div>
  )
}

export default HomePage
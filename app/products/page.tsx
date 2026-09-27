"use server"
import dbConnect from "@/lib/mongodb"
import React from "react"

const PRODUCTS_PAGE_SERVER = async () => {
    const isConnected = await dbConnect()
    if (!isConnected) throw new Error("INTERNAL SERVER ISSUE!")
    return (
        <main className="bg-(--arx-background) w-full h-screen items-center justify-center"><span>THIS WILL THE PRODUCT PAGE IN SERVER RENDER FORM FOR BETTER SEO.</span></main>
    )
}

export default PRODUCTS_PAGE_SERVER
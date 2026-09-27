import ButtonNormal from "@/components/ui/Buttons/ButtonNormal";
import { HTTP_Response } from "@/interfaces/httpResponse/httpServerResponse";
import React, { useEffect, useState } from "react";

const HeroRightSection: React.FC = () => {
    const [currentVisits, setCurrentVisits] = useState<number>(0)
    const fetchCurrentTotalVisits = async () => {
        try {
            const visitorsUrl = process.env.NEXT_PUBLIC_BASE_URL as string + process.env.NEXT_PUBLIC_VISITORS_URL as string
            if (!visitorsUrl) return

            const response = await fetch(visitorsUrl, {
                next:{
                    revalidate:600
                }
            })
            const data: HTTP_Response<{ totalVisitors: number }> = await response.json()
            if (response.ok && data.data) setCurrentVisits(data.data.totalVisitors)
            console.log(data)
        } catch (error) {
            console.log(error)
            setCurrentVisits(1)
            return
        }
    }

    useEffect(() => {
        fetchCurrentTotalVisits()
    }, [])
    return (
        <div className="w-[70%] flex flex-col my-2">
            <div className="flex gap-2">
                <ButtonNormal title={`Visitors: ${currentVisits.toLocaleString("en-IN")}`} />
                <ButtonNormal title={`Current Available Products: ${process.env.NEXT_PUBLIC_PRODUCTS as string ? process.env.NEXT_PUBLIC_PRODUCTS : "Not Decided"}`}  />
                <ButtonNormal title={`Upcomming Products: ${process.env.NEXT_PUBLIC_UPCOMMING_PRODUCT as string ? process.env.NEXT_PUBLIC_UPCOMMING_PRODUCT : "Not Decided"}`}  />
            </div>
            
        </div>
    )
}

export default HeroRightSection
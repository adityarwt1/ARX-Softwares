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
            const data: HTTP_Response<{ visits: number }> = await response.json()
            if (response.ok && data.data) setCurrentVisits(data.data.visits)
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
                <ButtonNormal title={`Visitors: ${String(currentVisits).toLocaleString()}`} />
                <ButtonNormal title={`Product: 2`} />
                <ButtonNormal title={`Upcomming: 5`} />
            </div>
            
        </div>
    )
}

export default HeroRightSection
import { ERROR_MESSAGE } from "@/enums/errors/erros";
import { HTTP_STATUS_CODE } from "@/enums/httpRequest/statusCode";
import { HTTP_Response } from "@/interfaces/httpResponse/httpServerResponse";
import dbConnect from "@/lib/mongodb";
import Visitors from "@/models/visitors";
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    try {
        const isConnected = await dbConnect()
        if(!isConnected){
            return NextResponse.json<HTTP_Response<string>>({
                success:false,
                error:{
                    message:"Failed To Connect Database!",
                    status_code:HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                }
            },{
                status:HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            })
        }
       const visits = await Visitors.findOne()
    .select({ visits: 1, _id: 0 });
        return NextResponse.json<HTTP_Response<{visits:number}>>({
            success:true,
            data:visits,
        })

    } catch (error) {
        return NextResponse.json<HTTP_Response<{visits:number}>>({
            success:false,
            error:{
                message:(error as Error).message,
                status_code:HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
            }
        }, {
            status:HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
        })
    }
    
}
export async function POST(req: NextRequest) {
    try {
        // current address 
        const forwardedFor = req.headers.get("x-forwarded-for");
        const ip =
            forwardedFor?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            "unknown";

        // mongoo connnect 
        const isConncted = await dbConnect()
        if (!isConncted) {
            if (process.env.NODE_ENV === "development") console.log("Database connection failed!")
            return NextResponse.json({
                error: ERROR_MESSAGE.isi
            })
        }
        let visitorsDoc = await Visitors.findOne({})

        if (!visitorsDoc) {
            const newVisitorDoc = new Visitors({
                visits: 1,
                ipAddress: [ip]
            })

            await newVisitorDoc.save()
        } else {
            const visitor = await Visitors.findOneAndUpdate(
                {},
                {
                    $addToSet: {
                        ipAddress: ip
                    },
                    $inc: {
                        visits: 1
                    }
                },
                {
                    new: true,
                    upsert: true
                }
            );

            if(!visitor) return NextResponse.json({
                error:ERROR_MESSAGE.ftcd,
            },{
                status:500
            })
        }

        return NextResponse.json<HTTP_Response<string>>({
            success:true,
            success_message:"Visit created!"
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: (error as Error).message,
            succeess: false,
        }, {
            status: 500
        })
    }
    
}
import { HTTP_STATUS_CODE } from "@/enums/httpRequest/statusCode";
import { HTTP_Response } from "@/interfaces/httpResponse/httpServerResponse";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/products";
import { NextRequest, NextResponse } from "next/server";

interface ProductInterface { title?: string, description?: string, url?: string, badges?: string[] }
export async function QUERY(req: NextRequest): Promise<NextResponse<HTTP_Response<string | ProductInterface>>> {
    try {
        const filters = await req.json() as { featured?: boolean, limit?: number, page?: number }
        const featured = Boolean(filters.featured)
        const filter = {} as { featured?: boolean }

        // if filter of feature exist 
        if (featured) {
            filter.featured = true
        }
        // database connections
        const isConnected = await dbConnect()
        if (!isConnected) {
            return NextResponse.json({
                success: false,
                error: {
                    message: "Internal server isssue!",
                    status_code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
                }
            })
        }
        // fetching products
        const { limit = 10, page = 1 } = filters;
        const skip = (page - 1) * limit;
        const products = await Product.find(filter)
            .select("title description url badges")
            .limit(limit)
            .skip(skip)
            .lean()
            .exec() as ProductInterface
        return NextResponse.json({
            success: true,
            data: products
        });
    } catch (error) {
        console.log((error as Error).message)
        return NextResponse.json({
            success: false,
            error: {
                message: (error as Error).message,
                status_code: 500
            }
        }, {
            status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
        })
    }
}
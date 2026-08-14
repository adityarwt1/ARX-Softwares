import { errorMessages } from "@/constants/errorsCommon/commonError";
import { HTTP_STATUS_CODE } from "@/enums/httpRequest/statusCode";
import { HTTP_Response } from "@/interfaces/httpResponse/httpServerResponse";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/products";
import { badRequest, internalServerIssue, resultantResponse } from "@/utils/httpResponses";
import { productCreateValidations, productFilterValidations } from "@/validations/productApi/product";
import { NextRequest, NextResponse } from "next/server";

interface ProductInterface { title?: string, description?: string, url?: string, badges?: string[] }
export async function QUERY(req: NextRequest): Promise<NextResponse<HTTP_Response<string | ProductInterface| unknown>>> {
    try {
        const filters = await req.json() as { featured?: boolean, limit?: number, page?: number }
        const featured = Boolean(filters.featured)
        const filter = {} as { featured?: boolean }

        // zod validations
        const isValidRequestScheme = productFilterValidations.safeParse(filter)
        if(!isValidRequestScheme.success){
            return badRequest({
                errorMessage:isValidRequestScheme.error.message  || "Bad Request!"
            })
        }
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

export async function POST(req:NextRequest):Promise<NextResponse<HTTP_Response>> {
    try {

        // authentication in the features
        const productBody= await req.json()

        const isValidProductCreateScheme = productCreateValidations.safeParse(productBody);
        if(!isValidProductCreateScheme.success){
            return badRequest({
                errorMessage:isValidProductCreateScheme.error.message
            })
        }

        // database connectoin error
        const isDatabaseConnect = await dbConnect()
        if(!isDatabaseConnect){
            return internalServerIssue({
                errorMessage:errorMessages.dataBaseConnectionFailedError
            })
        }

        const newProductCreateMongoDocument = new Product(productBody)
        // save to database 
        await newProductCreateMongoDocument.save()

        if(!newProductCreateMongoDocument){
            return internalServerIssue({
                errorMessage:errorMessages.mongodbDocumentCreationFailed + "Product"
            })
        }

        return resultantResponse<ProductInterface>({
            data:newProductCreateMongoDocument
        })
    } catch (error) {
        console.log(error)
        return internalServerIssue({
            errorMessage:(error as Error).message
        })
    }
}
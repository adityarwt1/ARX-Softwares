import { AdminAndDeveloper, JWT_TOKEN_INTERFACE } from "@/interfaces/auth/jwtToken";
import { HTTP_Response } from "@/interfaces/httpResponse/httpServerResponse";
import dbConnect from "@/lib/mongodb";
import Session, { SessionInterfaces } from "@/models/sessions";
import User, { UserSchemaInterface } from "@/models/user";
import { badRequest, internalServerIssue, resultantResponse } from "@/utils/httpResponses";
import { createUserValidations } from "@/validations/userSignup/adminAdnDeveloperSignupGeneral";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import {generateKeyPair} from "jose"
interface CreateUserResponse {
    accessToken: string
}
export async function POST(req: NextRequest): Promise<NextResponse<HTTP_Response<CreateUserResponse | unknown>>> {
    try {
        const requestBody = await req.json()
        const isValidRequest = createUserValidations.safeParse(requestBody)
        if (!isValidRequest.success) {
            return badRequest({ errorMessage: isValidRequest.error.message })
        }
        const isConnected = await dbConnect()

        if (!isConnected) {
            return internalServerIssue({
                errorMessage: "Failed to connedt datbase!"
            })
        }

        const userDock = new User(requestBody);
        await userDock.save()

        if (!userDock) {
            return internalServerIssue({
                errorMessage: "Failed to create user!"
            })
        }
        const userSavedDocument = userDock as HydratedDocument<UserSchemaInterface>;

        const refreshTokenCommon: AdminAndDeveloper = {
            email: userSavedDocument.email,
            isAdmin: userSavedDocument.isAdmin === true,
            userId: userSavedDocument._id.toString(),
        };
      const refreshTokenStrig = 
        const newSession = new Session({
            userId:userSavedDocument._id,
            refreshToken:refreshTokenStrig
        })
        await newSession.save()

        const savedSessionDocuemnt = newSession as HydratedDocument<SessionInterfaces>
        const frontendTokenPayload: JWT_TOKEN_INTERFACE = {
            sessionId: savedSessionDocuemnt._id.toString(),
            exp:new Date().getTime()+ 3600 * 30,
        }

        const adminFrontendRefreshToken = jwt.sign(frontendTokenPayload, process.env.ADMIN_FRONTEND_SECRET as string, {
            expiresIn:
        })
        return resultantResponse<CreateUserResponse>({
            data: {
                accessToken: "DUMMY"
            }
        })
    } catch (error) {
        console.log(error)
        return internalServerIssue<CreateUserResponse>({
            errorMessage: (error as Error).message
        })
    }
}
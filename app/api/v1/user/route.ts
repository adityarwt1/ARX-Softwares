import dbConnect from "@/lib/mongodb";
import Session from "@/models/session";
import User from "@/models/user";
import { StandarApiResponseV1 } from "@/types/apiRespnse/ApiResponse";
import { isUserAuthunticated } from "@/utils/auth/userApiAuthentications";
import { getToken } from "@/utils/authenticationsJose";
import { throwUnauthorized } from "@/utils/backendThrowers/thorwers";
import { getSessionIdToUserId } from "@/utils/dataBaseHelper/repeateQuesryHelpers";
import { badRequest, conflict, forbidden, internalServerIssue, resultantResponse, unauthorized } from "@/utils/httpResponses";
import { CreateUserSchema, UpdateUserSchema } from "@/validations/userSignup/userValidations";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

/**
 * when i api response send refresh the page to use the default strategy
 */
export async function POST(req: NextRequest): Promise<StandarApiResponseV1<unknown>> {
  try {
    const userCreateData = await req.json()
    // prevenet misslineous in the request by veryfying the data
    const isValidRequest = await CreateUserSchema.safeParseAsync(userCreateData)
    if (!isValidRequest.success) {
      const { message } = JSON.parse(isValidRequest.error.message)[0]
      return badRequest({
        errorMessage: message || isValidRequest.error.message || "Bad Request!"
      })
    }

    /// checking databser connectoin 
    if (!(await dbConnect())) return internalServerIssue()

    const userData = isValidRequest.data

    const isUserExistAlready = await User.findOne({
      email: userData.email
    }).select("_id")

    if (isUserExistAlready) {
      return conflict({
        errorMessage: "User already exist with  this email!"
      })
    }
    // password Hashing
    const hashedPassword = await bcrypt.hash(userData.password, 10)


    const userDoc = new User({ ...userData, password: hashedPassword })
    await userDoc.save()

    // faild to create user
    if (!userDoc) {
      return internalServerIssue({
        errorMessage: "Failed to creater user!"
      })
    }

    // create session for seperate
    //  7 day after date fillup 
    const today = new Date()
    const dateFormatFor7Days = new Date(today)
    dateFormatFor7Days.setDate(today.getDate() + 7)
    const newSessionAssignment = new Session({
      userId: userDoc._id,
      exp: dateFormatFor7Days || process.env.TOKEN_EXP_STRATEGY || "7d",
      isConsumer: true
    })



    await newSessionAssignment.save()

    if (!newSessionAssignment) {
      return internalServerIssue({
        errorMessage: "Failed to  create session!"
      })
    }
    const tokenResult = await getToken({
      sessionId: newSessionAssignment._id.toString(),
      exp: process.env.TOKEN_EXP_STRATEGY || "7d"
    })
    if (!tokenResult.isGenerated || !tokenResult.token) {
      return internalServerIssue({
        errorMessage: "Failed to create authentication token!"
      })
    }

    const response = await resultantResponse({
      data: {
        token: tokenResult.token,
      }
    })
    response.cookies.set("access_token", tokenResult.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    })
    return response
  } catch (error) {
    console.log((error as Error).message)
    return internalServerIssue({
      errorMessage: (error as Error)?.message || "Internal server issue!"
    })
  }
}


/// get user information detail
interface UserInformation {
  fullName: string,
  email: string,
  isAdmin: boolean,
  isConsumer: boolean,
  isDeveloper: boolean,
  profilePicture: string
}

const isValidTimeToProccedd = async (date: Date) => {
  const today = new Date()
  return today < date
}

export async function GET(req: NextRequest): Promise<StandarApiResponseV1<UserInformation | unknown>> {
  try {

    const isUserAuthenticated = await isUserAuthunticated(req)
    // when unotherized access are happing
    const unauthorizedResponse = await throwUnauthorized(isUserAuthenticated.isAuthorizedAccess)
    if (unauthorizedResponse) {
      return unauthorizedResponse
    }

    // database connection check 
    if (!(await dbConnect())) return internalServerIssue()
    // session and session validations

    const session = await Session.findOne({
      _id: isUserAuthenticated.tokenData?.sessionId
    }).lean().select("exp userId")
    // if seesion not available
    if (!session) {
      return unauthorized()
    }

    // date time limit check
    if (!(await isValidTimeToProccedd(session.exp as Date))) {
      return unauthorized()
    }

    const userInformations = await User.findOne({
      _id: session.userId
    })
      .lean()
      .select("fullName email isAdmin isDeveloper isConsumer profilePicture")

    // if user not foundf
    if (!userInformations) {
      // delete sessions
      await Session.findOneAndDelete({
        _id: isUserAuthenticated.tokenData?.sessionId
      }).lean().select("_id")
      return unauthorized()
    }

    return resultantResponse<UserInformation>({
      data: userInformations
    })
  } catch (error) {
    console.log((error as Error).message)
    return internalServerIssue({
      errorMessage: (error as Error).message || "Internal server issue!"
    })
  }
}


// update api

export async function PATCH(req: NextRequest): Promise<StandarApiResponseV1<unknown>> {
  try {
    const body = await req.json()
    const validateRequest = UpdateUserSchema.safeParse(body)

    // is valid requestoin or note
    if (!validateRequest.success) return badRequest()

    // not time to validate user authorized or not
    const isAuthorized = await isUserAuthunticated(req)
    if (!(isAuthorized.isAuthorizedAccess)) return unauthorized()

    // checked database connectes
    if (!(await dbConnect()) || !(isAuthorized.tokenData)) return internalServerIssue()
    const userId = await getSessionIdToUserId(isAuthorized.tokenData.sessionId)
    if (!userId) return unauthorized()
    //  now need to update the user
    // check if email updating 
    if (validateRequest.data.email) {
      const isExisting = await User.findOne({
        email: validateRequest.data.email
      }).lean().select("_id")

      if (isExisting && userId !== isExisting._id.toString()) {
        return forbidden()
      }
    }
    const updatedUser = await User.findOneAndUpdate({
      _id: userId
    },
      {
        ...body
      })
    if (!updatedUser) return internalServerIssue()
    return resultantResponse()
  } catch (error) {
    console.log((error as Error).message)
    return internalServerIssue()
  }
}
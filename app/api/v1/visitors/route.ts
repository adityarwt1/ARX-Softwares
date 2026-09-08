import dbConnect from "@/lib/mongodb";
import Visitors from "@/models/visitors";
import { StandarApiResponseV1 } from "@/types/apiRespnse/ApiResponse";
import { badRequest, internalServerIssue, resultantResponse } from "@/utils/httpResponses";
import { mongthThreeWord } from "@/utils/monthAndYearManupulations/monthAndyearManupulations";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest): Promise<StandarApiResponseV1<unknown>> {
    try {
        // capture current itme from the frontend 
        const searchParamams = req.nextUrl.searchParams;
        const currentTimeStampsValue = searchParamams.get("timeStamps");
        const currentTimeStamps = Number(currentTimeStampsValue);

        if (!currentTimeStampsValue || !Number.isFinite(currentTimeStamps)) {
            return badRequest({ errorMessage: "timeStamps query param is required and must be a valid number." });
        }

        // restore the save timestampt from the cookies
        const cookiesStore = await cookies()
        const lastVisit = cookiesStore.get(process.env.LAST_VISIT_TIMESTAMPS_COOKIENAME as string)?.value

        // ten minute stretagy number
        const tenMinutesStretegy = Number(process.env.LAST_VISTI_TIMESTAMPS_TIME) || 10 * 60 * 1000;
        const lastVisitTimestamp = lastVisit ? Number(lastVisit) : 0;
        const nowTimestamp = new Date(currentTimeStamps).getTime();

        // when no timestamp exists, allow first visit; otherwise use the cooldown window
        const isNowTimeToMakeVisit = !lastVisit || nowTimestamp - lastVisitTimestamp >= tenMinutesStretegy;

        // currenty not deciced to time limits pushed or note
        if (!isNowTimeToMakeVisit) return resultantResponse()

        /// getting the all information from the
        const frontendDateAndTime = new Date(currentTimeStamps)
        const currentYear = frontendDateAndTime.getFullYear()
        const monthIndex = frontendDateAndTime.getMonth() as keyof typeof mongthThreeWord
        const currentMonth = mongthThreeWord[monthIndex]
        const currentDate = frontendDateAndTime.getDate()

        // now cheking the database connections 

        if (!(await dbConnect())) return internalServerIssue({ errorMessage: "Database Connection failed!" })
        // getting the year of the current
        let yearDocument = await Visitors.findOne({
            year: currentYear
        }).select("_id")

        // if year not exist trying to make the completly from the start
        if (!yearDocument) {
            yearDocument = new Visitors({ year: currentYear });
            await yearDocument.save();
        }

        // updateing vistior count from it
        const updateVisitorDocument = await Visitors.findOneAndUpdate(
            {
                _id: yearDocument._id,
            },
            [
                {
                    $set: {
                        months: {
                            $let: {
                                vars: {
                                    monthExists: {
                                        $in: [
                                            currentMonth,
                                            {
                                                $map: {
                                                    input: "$months",
                                                    as: "month",
                                                    in: "$$month.month",
                                                },
                                            },
                                        ],
                                    },
                                },
                                in: {
                                    $cond: [
                                        "$$monthExists",

                                        // MONTH EXISTS
                                        {
                                            $map: {
                                                input: "$months",
                                                as: "month",
                                                in: {
                                                    $cond: [
                                                        {
                                                            $eq: [
                                                                "$$month.month",
                                                                currentMonth,
                                                            ],
                                                        },
                                                        {
                                                            month: "$$month.month",
                                                            days: {
                                                                $let: {
                                                                    vars: {
                                                                        dateExists: {
                                                                            $in: [
                                                                                currentDate,
                                                                                {
                                                                                    $map: {
                                                                                        input: "$$month.days",
                                                                                        as: "day",
                                                                                        in: "$$day.date",
                                                                                    },
                                                                                },
                                                                            ],
                                                                        },
                                                                    },
                                                                    in: {
                                                                        $cond: [
                                                                            "$$dateExists",

                                                                            // DATE EXISTS
                                                                            {
                                                                                $map: {
                                                                                    input: "$$month.days",
                                                                                    as: "day",
                                                                                    in: {
                                                                                        $cond: [
                                                                                            {
                                                                                                $eq: [
                                                                                                    "$$day.date",
                                                                                                    currentDate,
                                                                                                ],
                                                                                            },
                                                                                            {
                                                                                                date: "$$day.date",
                                                                                                visitios: {
                                                                                                    $add: [
                                                                                                        "$$day.visitios",
                                                                                                        1,
                                                                                                    ],
                                                                                                },
                                                                                            },
                                                                                            "$$day",
                                                                                        ],
                                                                                    },
                                                                                },
                                                                            },

                                                                            // DATE DOES NOT EXIST
                                                                            {
                                                                                $concatArrays: [
                                                                                    "$$month.days",
                                                                                    [
                                                                                        {
                                                                                            date: currentDate,
                                                                                            visitios: 1,
                                                                                        },
                                                                                    ],
                                                                                ],
                                                                            },
                                                                        ],
                                                                    },
                                                                },
                                                            },
                                                        },
                                                        "$$month",
                                                    ],
                                                },
                                            },
                                        },

                                        // MONTH DOES NOT EXIST
                                        {
                                            $concatArrays: [
                                                "$months",
                                                [
                                                    {
                                                        month: currentMonth,
                                                        days: [
                                                            {
                                                                date: currentDate,
                                                                visitios: 1,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                    },
                },
            ],
            {
                new: true,
                updatePipeline: true,
            }
        );

        if (updateVisitorDocument) {
            cookiesStore.set(process.env.LAST_VISIT_TIMESTAMPS_COOKIENAME as string, String(nowTimestamp), {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 30,
            });
            return resultantResponse();
        }
        return internalServerIssue()
    } catch (error) {
        console.log((error as Error).message)
        return internalServerIssue()
    }
}



export async function GET(): Promise<StandarApiResponseV1<unknown>> {
    try {
        if (!(await dbConnect())) return internalServerIssue({ errorMessage: "Database Connection failed!" })

        const visitorsDocuments = await Visitors.find({}).lean();
        
        const totalVisitors = visitorsDocuments.reduce((sum: number, document: any) => {
            const yearTotal = (document.months ?? []).reduce((monthSum: number, month: any) => {
                const monthTotal = (month.days ?? []).reduce((daySum: number, day: any) => daySum + (day.visitios ?? 0), 0);
                return monthSum + monthTotal;
            }, 0);

            return sum + yearTotal;
        }, 0);

        return resultantResponse({
            data: {
                totalVisitors,
            },
        });
    } catch (error) {
        console.log((error as Error).message)
        return internalServerIssue()
    }
}
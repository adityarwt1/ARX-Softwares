import { HTTP_Response } from "@/interfaces/httpResponse/httpServerResponse";
import { NextResponse } from "next/server";

export type StandarApiResponseV1<T> = NextResponse<HTTP_Response<T>>
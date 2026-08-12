import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");

  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  console.log("Client IP:", ip);

  return NextResponse.json({
    success: true,
    ip,
  });
}
export async function POST(req:Request) {
    console.log(req)
    return NextResponse.json({
        message:req.url + " route is working!"
    })
}
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");

  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (ip === "unknown") {
    return NextResponse.json(
      { success: false, message: "IP not found" },
      { status: 400 }
    );
  }

  const geoResponse = await fetch(
    `http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,lat,lon,timezone,isp,query`
  );

  const geo = await geoResponse.json();

  return NextResponse.json({
    success: true,
    ip,
    location: {
      country: geo.country,
      region: geo.regionName,
      city: geo.city,
      latitude: geo.lat,
      longitude: geo.lon,
      timezone: geo.timezone,
      isp: geo.isp,
    },
  });
}
export async function POST(req:Request) {
    console.log(req)
    return NextResponse.json({
        message:req.url + " route is working!"
    })
}
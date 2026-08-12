import { NextResponse, NextRequest } from "next/server";

// Rate limiting map - persists across requests in memory
// Note: This resets on server restart. Consider using Redis for persistence.
const visitorHashTable10Minute = new Map<string, number>();

export default async function proxy(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip =
        forwardedFor?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip") ||
        "unknown";

    if (pathname === "/") {
        const isAlreadyVisited = visitorHashTable10Minute.has(ip);
        if (!isAlreadyVisited) {
            await fetch(req.nextUrl.origin + "/api/v1/visitors", {
                method: "POST",
            });
            visitorHashTable10Minute.set(ip, new Date().getTime());
            return NextResponse.next();
        } else {
            const timeValueStored = visitorHashTable10Minute.get(ip);
            if (timeValueStored) {
                const isTimeLimitReached =
                    new Date().getTime() > timeValueStored + 1000 * 60 * 10;
                if (isTimeLimitReached) {
                    await fetch(req.nextUrl.origin + "/api/v1/visitors", {
                        method: "POST",
                    });
                    visitorHashTable10Minute.set(ip, new Date().getTime());
                    return NextResponse.next();
                }
            }
            return NextResponse.next();
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/"],
};
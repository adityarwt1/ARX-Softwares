import { NextRequest, NextResponse, ProxyConfig } from "next/server";

export async function proxy(req:NextRequest) {
    return NextResponse.next()
}

export  const config:ProxyConfig = {
    matcher:['/']
}
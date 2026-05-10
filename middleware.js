import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    // allow public routes
    if (
        pathname.startsWith("/api/auth/login") ||
        pathname.startsWith("/api/auth/register") ||
        pathname.startsWith("/api/auth/refresh")
    ) {
        return NextResponse.next();
    }

    const token = req.cookies.get("token")?.value;

    // console.log("MIDDLEWARE TOKEN:", token);

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);

        // console.log("DECODED USER:", payload);

        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("user", JSON.stringify(payload));

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (err) {
        console.log("JWT ERROR:", err.message);

        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
}

export const config = {
    matcher: ["/api/:path*"],
};
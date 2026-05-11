import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    const token = req.cookies.get("token")?.value;

    // PUBLIC API ROUTES
    if (
        pathname.startsWith("/api/auth/login") ||
        pathname.startsWith("/api/auth/register") ||
        pathname.startsWith("/api/auth/refresh")
    ) {
        return NextResponse.next();
    }

    // LOGIN / REGISTER REDIRECT
    if (
        pathname === "/login" ||
        pathname === "/register"
    ) {
        if (token) {
            try {
                await jwtVerify(token, JWT_SECRET);

                return NextResponse.redirect(
                    new URL("/dashboard", req.url)
                );
            } catch {
                // invalid token -> allow access to login
                return NextResponse.next();
            }
        }

        return NextResponse.next();
    }

    // PROTECT API ROUTES
    if (pathname.startsWith("/api")) {
        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        try {
            const { payload } = await jwtVerify(
                token,
                JWT_SECRET
            );

            const requestHeaders = new Headers(req.headers);

            requestHeaders.set(
                "user",
                JSON.stringify(payload)
            );

            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        } catch (err) {
            console.log("JWT ERROR:", err.message);

            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/api/:path*",
        "/login",
        "/register",
    ],
};
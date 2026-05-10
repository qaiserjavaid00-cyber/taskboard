import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
    const token = cookies().get("token")?.value;

    if (!token) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const user = verifyToken(token);

        return NextResponse.json(
            { user },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json(
            { message: "Invalid token" },
            { status: 401 }
        );
    }
}
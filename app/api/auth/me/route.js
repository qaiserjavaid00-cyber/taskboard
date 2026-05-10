import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";


function getUserFromReq() {
    const token = cookies().get("token")?.value;

    if (!token) return null;

    try {
        const user = verifyToken(token);

        return user;
    } catch (e) {
        console.log("JWT ERROR:", e.message);
        return null;
    }
}


export async function GET() {
    const user = getUserFromReq();

    if (!user) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    return NextResponse.json(
        { user },
        { status: 200 }
    );
}
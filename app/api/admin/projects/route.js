
import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
function getUserFromReq() {
    const token = cookies().get("token")?.value;
    // console.log("TOKEN FROM COOKIE:", token);
    if (!token) return null;

    try {
        const user = verifyToken(token);
        // console.log("DECODED USER:", user);
        return user;
    } catch (e) {
        console.log("JWT ERROR:", e.message);
        return null;
    }
}

export async function GET(req) {
    try {
        await connectDB();

        const user = getUserFromReq();

        // RBAC CHECK
        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        if (user?.role !== "admin") {
            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            );
        }

        const projects = await Project.find()
            .populate("owner", "name email");
        console.log("Projects from Admin route", projects)
        return NextResponse.json(projects);

    } catch (error) {
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
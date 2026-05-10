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
        console.log("DECODED USER:", user);
        return user;
    } catch (e) {
        console.log("JWT ERROR:", e.message);
        return null;
    }
}

export async function GET(req, { params }) {
    await connectDB();

    const user = getUserFromReq();

    if (!user) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const project = await Project.findById(params.id)
        .populate("members", "name email")
        .populate("owner", "name email");

    if (!project) {
        return NextResponse.json(
            { message: "Project not found" },
            { status: 404 }
        );
    }

    const isAdmin = user.role === "admin";
    const isOwner = project.owner._id.toString() === user.userId;
    const isMember = project.members.some((member) => member._id.toString() === user.userId);

    if (!isAdmin && !isOwner && !isMember) {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }

    return NextResponse.json(project);
}
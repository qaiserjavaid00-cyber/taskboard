import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import getUser from "@/lib/helpers/getUser";
import Task from "@/lib/models/Task";
import User from "@/lib/models/User";

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

///////Get project by ID

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

//////EDIT/////////////////////

export async function PATCH(req, { params }) {
    await connectDB();

    const user = getUser();

    if (!user) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const project = await Project.findById(params.id);

    if (!project) {
        return NextResponse.json(
            { message: "Project not found" },
            { status: 404 }
        );
    }

    const isAdmin = user?.role === "admin";
    const isOwner = project?.owner.toString() === user?.userId;

    if (!isAdmin && !isOwner) {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }

    const body = await req.json();

    const updatedProject = await Project.findByIdAndUpdate(
        params.id,
        {
            title: body.title,
            description: body.description,
        },
        { new: true }
    );

    return NextResponse.json(updatedProject);
}

/////////DELETE///////////////////////////////////

export async function DELETE(req, { params }) {
    await connectDB();

    const user = getUser();

    if (!user) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const project = await Project.findById(params.id);

    if (!project) {
        return NextResponse.json(
            { message: "Project not found" },
            { status: 404 }
        );
    }

    const isAdmin = user?.role === "admin";
    const isOwner = project?.owner.toString() === user.userId;

    if (!isAdmin && !isOwner) {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }

    await Project.findByIdAndDelete(params.id);

    return NextResponse.json({
        message: "Project deleted successfully",
    });
}
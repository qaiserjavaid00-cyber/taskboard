import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";
import User from "@/lib/models/User";
import Task from "@/lib/models/Task";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

function getUser() {
    const token = cookies().get("token")?.value;
    if (!token) return null;
    return verifyToken(token);
}


/////////////////////////////////////////
/////           Add Memebr         //////
/////////////////////////////////////////

export async function POST(req, { params }) {
    await connectDB();

    const user = getUser();
    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const { userId } = await req.json();

    const project = await Project.findById(id);

    if (!project) {
        return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    const isAdmin = user?.role === "admin";
    const isOwner = project?.owner.toString() === user.userId;

    // Only owner or admin
    if (!isOwner && !isAdmin) {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // prevent duplicates
    if (project.members.includes(userId)) {
        return NextResponse.json({ message: "Already a member" }, { status: 400 });
    }

    project.members.push(userId);
    await project.save();

    return NextResponse.json(project);
}

export async function DELETE(req, { params }) {
    await connectDB();

    const user = getUser();
    if (!user) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
    /////////////////////////////////////////
    /////           Remove Memebr       /////
    /////////////////////////////////////////
    const { id } = params; // projectId
    const { userId } = await req.json(); // member to remove

    const project = await Project.findById(id);

    if (!project) {
        return NextResponse.json(
            { message: "Project not found" },
            { status: 404 }
        );
    }

    const isAdmin = user?.role === "admin";
    const isOwner = project?.owner.toString() === user.userId;

    // Only owner or admin
    if (!isOwner && !isAdmin) {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }
    // prevent removing owner accidentally
    if (project.owner.toString() === userId) {
        return NextResponse.json(
            { message: "Cannot remove project owner" },
            { status: 400 }
        );
    }

    // remove member
    project.members = project.members.filter((m) => m.toString() !== userId);

    await project.save();

    return NextResponse.json({
        message: "Member removed successfully",
        project,
    });
}
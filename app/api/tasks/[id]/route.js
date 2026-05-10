import { connectDB } from "@/lib/db";
import Task from "@/lib/models/Task";
import Project from "@/lib/models/Project";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

const updateSchema = z.object({
    title: z.string().min(1).optional(),

    description: z.string().optional(),

    status: z
        .enum(["todo", "in-progress", "done"])
        .optional(),

    priority: z
        .enum(["low", "medium", "high"])
        .optional(),

    dueDate: z.string().optional(),

    assignees: z.array(z.string()).optional(),
});

function getUser() {
    const token = cookies().get("token")?.value;
    if (!token) return null;

    try {
        return verifyToken(token);
    } catch {
        return null;
    }
}


export async function PATCH(req, { params }) {
    await connectDB();

    const user = getUser();
    const { id } = params;

    const task = await Task.findById(id);
    if (!task) {
        return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    const project = await Project.findById(task.project);

    // Authorization
    const isAdmin = user.role === "admin";
    const isOwner = project.owner.toString() === user.userId;

    if (!isAdmin && !isOwner) {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }

    const body = await req.json();

    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { errors: parsed.error.flatten().fieldErrors },
            { status: 400 }
        );
    }

    const updated = await Task.findByIdAndUpdate(
        id,
        parsed.data,
        { new: true }
    )
        .populate("assignees", "name email")
        .populate("createdBy", "name email");

    return NextResponse.json(updated);
}


export async function DELETE(req, { params }) {
    await connectDB();

    const user = getUser();
    const { id } = params;

    const task = await Task.findById(id);
    if (!task) {
        return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    const project = await Project.findById(task.project);

    if (!project) {
        return NextResponse.json(
            { message: "Project not found" },
            { status: 404 }
        );
    }

    const isAdmin = user.role === "admin";
    const isOwner = project.owner.toString() === user.userId;

    if (!isAdmin && !isOwner) {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }

    await Task.findByIdAndDelete(id);

    return NextResponse.json({ message: "Task deleted" });
}


export async function GET(req, { params }) {
    await connectDB();

    const user = getUser();

    if (!user) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const populatedTask = await Task.findById(params.id)
        .populate("assignees", "name email")
        .populate("createdBy", "name email")
        .populate({
            path: "project",
            select: "title members",
            populate: {
                path: "members",
                select: "name email",
            },
        });

    if (!populatedTask) {
        return NextResponse.json(
            { message: "Task not found" },
            { status: 404 }
        );
    }

    const project = await Project.findById(populatedTask.project);

    const isOwner =
        project.owner.toString() === user.userId;

    const isMember = project.members?.some(
        (m) => m.toString() === user.userId
    );

    if (
        !isOwner &&
        !isMember &&
        user.role !== "admin"
    ) {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }

    return NextResponse.json(populatedTask);
}


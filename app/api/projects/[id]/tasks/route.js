import { connectDB } from "@/lib/db";
import Task from "@/lib/models/Task";
import Project from "@/lib/models/Project";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import { createTaskSchema } from "@/lib/validators/task";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

function getUser() {
    const token = cookies().get("token")?.value;
    if (!token) return null;

    try {
        return verifyToken(token);
    } catch {
        return null;
    }
}

// GET /api/projects/[id]/tasks
export async function GET(req, { params }) {
    await connectDB();

    const user = getUser();
    if (!user) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const { id } = params;

    const project = await Project.findById(id);
    if (!project) {
        return NextResponse.json(
            { message: "Project not found" },
            { status: 404 }
        );
    }

    /* =====================================================
       Only owner or project members or admin
    ====================================================== */
    const isAdmin = user.role === "admin";
    const isOwner = project.owner.toString() === user.userId;
    const isMember = project.members?.some((member) => member.toString() === user.userId);

    if (!isAdmin && !isOwner && !isMember) {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }

    ////Find task by project ID

    const tasks = await Task.find({ project: id })
        .populate("assignees", "name email")
        .populate("createdBy", "name email");

    return NextResponse.json(tasks, { status: 200 });
}





/* ======================================================
   CREATE TASK
   POST /api/projects/[id]/tasks
====================================================== */

export async function POST(req, { params }) {
    await connectDB();

    /* ======================================================
       AUTH
    ====================================================== */

    const user = getUser();

    if (!user) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    /* ======================================================
       GET PROJECT
    ====================================================== */

    const { id } = params;

    const project = await Project.findById(id);

    if (!project) {
        return NextResponse.json(
            { message: "Project not found" },
            { status: 404 }
        );
    }

    /* ======================================================
       AUTHORIZATION
       Only owner or project members or admin
    ====================================================== */

    const isAdmin = user.role === "admin";

    const isOwner = project.owner.toString() === user.userId;

    const isMember = project.members?.some((member) => member.toString() === user.userId);

    if (!isAdmin && !isOwner && !isMember) {
        return NextResponse.json(
            { message: "Forbidden" },
            { status: 403 }
        );
    }

    /* ======================================================
       VALIDATE BODY
    ====================================================== */

    const body = await req.json();

    const parsed =
        createTaskSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            {
                errors:
                    parsed.error.flatten()
                        .fieldErrors,
            },
            { status: 400 }
        );
    }

    /* ======================================================
       ASSIGNEES
    ====================================================== */

    const assignees =
        parsed.data.assignees || [];

    // Only project members can be assigned

    const projectMemberIds =
        project.members.map((member) =>
            member.toString()
        );

    const invalidAssignees =
        assignees.filter(
            (id) =>
                !projectMemberIds.includes(id)
        );

    if (invalidAssignees.length > 0) {
        return NextResponse.json(
            {
                message:
                    "Some assignees are not project members",
            },
            { status: 400 }
        );
    }

    // Remove duplicate IDs

    const uniqueAssignees = [
        ...new Set(assignees),
    ];

    /* ======================================================
       CREATE TASK
    ====================================================== */

    const task = await Task.create({
        title: parsed.data.title,
        description: parsed.data.description,
        status:
            parsed.data.status || "todo",

        priority:
            parsed.data.priority ||
            "medium",

        dueDate: parsed.data.dueDate,

        assignees: uniqueAssignees,

        project: id,

        createdBy: user.userId,
    });

    /* ======================================================
       POPULATE RESPONSE
    ====================================================== */

    const populatedTask =
        await Task.findById(task._id)
            .populate(
                "assignees",
                "name email"
            )
            .populate(
                "createdBy",
                "name email"
            )
            .populate(
                "project",
                "title"
            );

    return NextResponse.json(
        populatedTask,
        { status: 201 }
    );
}
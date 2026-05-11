import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";
import User from "@/lib/models/User";
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

export async function POST(req) {
    // console.log("PROJECT API HIT");
    // console.log("TOKEN:", cookies().get("token"));
    await connectDB();

    const user = getUserFromReq();
    // console.log("user from create project api", user)
    if (!user) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const { title, description } = await req.json();

    const project = await Project.create({
        title,
        description,
        owner: user.userId,
        members: [user.userId],
    });

    return NextResponse.json(project, { status: 201 });
}


export async function GET(req) {
    try {
        await connectDB();

        const user = getUserFromReq();

        // 🔥 ALWAYS CHECK FIRST
        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        let projects = await Project.find()
            .populate("owner", "name email")
            .populate("members", "name email");


        if (user.role === "admin") {
            return NextResponse.json({
                ownedProjects: projects,
                teamProjects: [],
            });
        }


        const ownedProjects = projects.filter((p) =>
            p.owner?._id?.toString() === user.userId
        );


        const teamProjects = projects.filter((p) => {
            const isOwner =
                p.owner?._id?.toString() === user.userId;

            const isMember = (p.members || []).some(
                (m) => m?._id?.toString() === user.userId
            );

            return !isOwner && isMember;
        });

        return NextResponse.json({
            ownedProjects,
            teamProjects,
        });

    } catch (err) {
        console.log("GET PROJECTS ERROR:", err);

        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
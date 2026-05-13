import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { createProjectSchema } from "@/lib/validators/project";

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

////////Create project/////////////////////////

// export async function POST(req) {
//     await connectDB();

//     const user = getUserFromReq();

//     if (!user) {
//         return NextResponse.json(
//             { message: "Unauthorized" },
//             { status: 401 }
//         );
//     }

//     try {
//         const body = await req.json();

//         // ZOD VALIDATION
//         const validatedData =
//             createProjectSchema.parse(body);

//         const project = await Project.create({
//             ...validatedData,
//             owner: user.userId,
//             members: [user.userId],
//         });

//         return NextResponse.json(project, {
//             status: 201,
//         });

//     } catch (error) {
//         console.log("PROJECT CREATE ERROR:", error);

//         return NextResponse.json(
//             {
//                 message:
//                     error?.issues?.[0]?.message ||
//                     error?.message ||
//                     "Validation failed",
//             },
//             { status: 400 }
//         );
//     }
// }

export async function POST(req) {
    await connectDB();

    const user = getUserFromReq();

    if (!user) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const body = await req.json();

        const result =
            createProjectSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                {
                    message:
                        result.error.issues?.[0]
                            ?.message ||
                        "Validation failed",
                    errors: result.error.issues,
                },
                { status: 400 }
            );
        }

        const project = await Project.create({
            ...result.data,
            owner: user.userId,
            members: [user.userId],
        });

        return NextResponse.json(project, {
            status: 201,
        });

    } catch (error) {
        console.log("PROJECT CREATE ERROR:", error);

        return NextResponse.json(
            {
                message:
                    error?.message ||
                    "Server error",
            },
            { status: 500 }
        );
    }
}

/////Get  All projects

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
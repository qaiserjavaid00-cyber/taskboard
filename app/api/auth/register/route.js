import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// export async function POST(req) {

//     console.log("Incoming request...");

//     await connectDB();
//     const body = await req.json();
//     console.log("BODY:", body);

//     const { name, email, password } = body;

//     const existing = await User.findOne({ email });
//     if (existing) {
//         return NextResponse.json(
//             { message: "User already exists" },
//             { status: 400 }
//         );
//     }

//     const hashed = await bcrypt.hash(password, 10);

//     const user = await User.create({
//         name,
//         email,
//         password: hashed,
//     });

//     return NextResponse.json(
//         { message: "User created", user },
//         { status: 201 }
//     );
// }

export async function POST(req) {
    try {
        console.log("Incoming request...");

        await connectDB();

        const body = await req.json();
        console.log("BODY:", body);

        const { name, email, password } = body;

        const existing = await User.findOne({ email });
        if (existing) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed,
        });

        return NextResponse.json(
            { message: "User created", user },
            { status: 201 }
        );

    } catch (err) {
        console.error("REGISTER ERROR:", err);

        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
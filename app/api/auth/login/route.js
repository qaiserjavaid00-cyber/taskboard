import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import {
    signAccessToken,
    signRefreshToken,
} from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();

    // ✅ 1. Get data from request
    const { email, password } = await req.json();

    // ✅ 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 401 }
        );
    }

    // ✅ 3. Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 401 }
        );
    }

    // ✅ 4. Generate tokens
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    // ✅ 5. Save refresh token in DB (for rotation)
    user.refreshToken = refreshToken;
    await user.save();

    // ✅ 6. Send cookies
    const res = NextResponse.json({
        message: "Login successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });

    res.cookies.set("token", accessToken, {
        httpOnly: true,
        secure: true, // true in production
        sameSite: "lax",
        path: "/",
    });

    res.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
    });

    return res;
}
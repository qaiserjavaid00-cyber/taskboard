import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { verifyToken, signAccessToken, signRefreshToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();

    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
        return NextResponse.json({ message: "No refresh token" }, { status: 401 });
    }

    try {
        const decoded = verifyToken(refreshToken);

        const user = await User.findById(decoded.userId);

        if (!user || user.refreshToken !== refreshToken) {
            return NextResponse.json({ message: "Invalid token" }, { status: 403 });
        }

        // 🔄 ROTATION
        const newAccessToken = signAccessToken(user);
        const newRefreshToken = signRefreshToken(user);

        user.refreshToken = newRefreshToken;
        await user.save();
        console.log("🔄 Refresh token triggered for user:", decoded.userId);
        const res = NextResponse.json({ message: "Token refreshed" });

        res.cookies.set("token", newAccessToken, {
            httpOnly: true,
            path: "/",
        });

        res.cookies.set("refreshToken", newRefreshToken, {
            httpOnly: true,
            path: "/",
        });

        return res;
    } catch (err) {
        return NextResponse.json({ message: "Invalid refresh token" }, { status: 403 });
    }
}
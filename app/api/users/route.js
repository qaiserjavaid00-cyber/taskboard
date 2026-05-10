import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();

    const users = await User.find({}, "_id name email role");

    return NextResponse.json(users);
}
"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    Folder,
    LogOut,
} from "lucide-react";
import { useLogout } from "@/hooks/users/useUsers";

export default function Sidebar() {
    const logout = useLogout();
    return (
        <aside className="w-72 min-h-screen bg-[#0f172a] border-r border-white/10 hidden md:flex flex-col px-5 py-6">

            {/* LOGO */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    T
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white">
                        TaskBoard
                    </h1>

                    <p className="text-xs text-slate-400">
                        Project Management
                    </p>
                </div>
            </div>

            {/* NAVIGATION */}
            <nav className="space-y-2">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-300 hover:bg-white/5 hover:text-white transition"
                >
                    <LayoutDashboard size={18} />
                    Dashboard
                </Link>

                <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-300 hover:bg-white/5 hover:text-white transition"
                >
                    <Folder size={18} />
                    Projects
                </Link>
            </nav>

            {/* LOGOUT */}
            <button
                onClick={() => logout.mutate()}
                className="mt-auto flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
            >
                <LogOut size={18} />
                {logout.isPending ? "Logging out..." : "Logout"}
            </button>
        </aside>
    );
}
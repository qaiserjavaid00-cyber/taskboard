"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1">
                <Topbar />

                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}
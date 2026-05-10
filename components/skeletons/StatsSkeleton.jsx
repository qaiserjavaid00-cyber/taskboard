"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function StatsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="relative overflow-hidden bg-[#111827] border border-white/10 rounded-2xl p-5"
                >
                    {/* shimmer overlay */}
                    <div
                        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        style={{
                            animation: "shimmer 1.6s infinite",
                        }}
                    />

                    <div className="flex justify-between items-center relative z-10">
                        {/* LEFT SIDE */}
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-16" />
                        </div>

                        {/* ICON PLACEHOLDER */}
                        <Skeleton className="h-10 w-10 rounded-xl" />
                    </div>
                </div>
            ))}
        </div>
    );
}
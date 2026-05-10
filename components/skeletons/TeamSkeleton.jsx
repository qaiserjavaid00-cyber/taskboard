"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function TeamSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className="relative overflow-hidden bg-[#111827] border border-white/5 rounded-xl px-4 py-3 flex items-center justify-between"
                >
                    {/* shimmer overlay */}
                    <div
                        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        style={{
                            animation: "shimmer 1.6s infinite",
                        }}
                    />

                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-3 relative z-10">
                        <Skeleton className="w-10 h-10 rounded-full" />

                        <div className="space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-3 w-36" />
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-3 relative z-10">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-6 w-6 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}
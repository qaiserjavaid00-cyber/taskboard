"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ProjectCardSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-5"
                >
                    {/* shimmer overlay */}
                    <div
                        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        style={{
                            animation: "shimmer 1.6s infinite",
                        }}
                    />

                    <div className="flex items-center justify-between relative z-10">
                        {/* LEFT SIDE */}
                        <div className="flex items-center gap-4">
                            {/* avatar */}
                            <Skeleton className="w-14 h-14 rounded-2xl" />

                            {/* text */}
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-40" />
                                <Skeleton className="h-4 w-56" />
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="hidden md:flex flex-col items-end gap-2">
                            <Skeleton className="h-6 w-12" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
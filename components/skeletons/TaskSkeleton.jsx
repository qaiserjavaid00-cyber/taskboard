"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function TaskSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className="relative overflow-hidden bg-[#111827] border border-white/5 rounded-2xl p-5 flex justify-between"
                >
                    {/* shimmer effect */}
                    <div
                        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        style={{
                            animation: "shimmer 1.6s infinite",
                        }}
                    />

                    {/* LEFT SIDE */}
                    <div className="space-y-3 w-full relative z-10">
                        <Skeleton className="h-5 w-1/3" />

                        <div className="flex gap-3">
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex flex-col items-end gap-3 relative z-10">
                        <Skeleton className="h-4 w-12" />

                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
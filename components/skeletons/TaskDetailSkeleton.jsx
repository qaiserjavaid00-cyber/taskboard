"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function TaskDetailsSkeleton() {
    return (
        <>
            <style jsx>{`
                @keyframes shimmer {
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>

            <div className="min-h-screen bg-[#0f172a] text-white">

                {/* TOP BAR */}
                <div className="border-b border-white/10 bg-white/5 backdrop-blur-md">
                    <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

                        <div className="space-y-3">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-10 w-72" />
                            <Skeleton className="h-4 w-40" />
                        </div>

                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-24 rounded-xl" />
                            <Skeleton className="h-10 w-24 rounded-xl" />
                        </div>

                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* OVERVIEW */}
                        <div className="relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-6">

                            {/* SHIMMER */}
                            <div
                                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                                style={{
                                    animation:
                                        "shimmer 1.6s infinite",
                                }}
                            />

                            <div className="relative z-10">
                                <div className="flex gap-3 mb-5">
                                    <Skeleton className="h-7 w-24 rounded-full" />
                                    <Skeleton className="h-7 w-32 rounded-full" />
                                </div>

                                <Skeleton className="h-7 w-40 mb-5" />

                                <div className="space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                            </div>
                        </div>

                        {/* COMMENTS */}
                        <div className="relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-6">

                            <div
                                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                                style={{
                                    animation:
                                        "shimmer 1.6s infinite",
                                }}
                            />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                    <Skeleton className="h-6 w-40" />
                                </div>

                                <Skeleton className="h-32 w-full rounded-xl" />

                                <div className="flex justify-between mt-4">
                                    <Skeleton className="h-10 w-32 rounded-xl" />
                                    <Skeleton className="h-10 w-28 rounded-xl" />
                                </div>

                                <Skeleton className="h-28 w-full rounded-xl mt-6" />
                            </div>
                        </div>
                    </div>

                    {/* SIDEBAR */}
                    <div className="space-y-6">

                        {/* TASK INFO */}
                        <div className="relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-6">

                            <div
                                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                                style={{
                                    animation:
                                        "shimmer 1.6s infinite",
                                }}
                            />

                            <div className="relative z-10">
                                <Skeleton className="h-6 w-32 mb-6" />

                                <div className="space-y-6">

                                    {/* CREATED BY */}
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-10 w-10 rounded-full" />

                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-28" />
                                            <Skeleton className="h-3 w-40" />
                                        </div>
                                    </div>

                                    {/* ASSIGNEES */}
                                    {[1, 2].map((i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between bg-[#111827] border border-white/5 rounded-xl px-4 py-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="h-10 w-10 rounded-full" />

                                                <div className="space-y-2">
                                                    <Skeleton className="h-4 w-24" />
                                                    <Skeleton className="h-3 w-36" />
                                                </div>
                                            </div>

                                            <Skeleton className="h-5 w-5 rounded-full" />
                                        </div>
                                    ))}

                                    {/* DATE BOXES */}
                                    <Skeleton className="h-16 w-full rounded-xl" />
                                    <Skeleton className="h-16 w-full rounded-xl" />
                                </div>
                            </div>
                        </div>

                        {/* ACTIVITY */}
                        <div className="relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-6">

                            <div
                                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                                style={{
                                    animation:
                                        "shimmer 1.6s infinite",
                                }}
                            />

                            <div className="relative z-10">
                                <Skeleton className="h-6 w-28 mb-6" />

                                <div className="space-y-5">
                                    {[1, 2].map((i) => (
                                        <div
                                            key={i}
                                            className="flex gap-3"
                                        >
                                            <Skeleton className="h-3 w-3 rounded-full mt-2" />

                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-40" />
                                                <Skeleton className="h-3 w-24" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
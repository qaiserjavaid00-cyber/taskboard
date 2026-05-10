"use client";

import Link from "next/link";

export default function ProjectCard({ project }) {


    const initial =
        project.title?.charAt(0).toUpperCase();

    const shortDescription =
        project.description
            ?.split(" ")
            .slice(0, 5)
            .join(" ") + "...";

    // TASK STATS
    const totalTasks = project.tasks?.length || 0;

    const completedTasks =
        project.tasks?.filter(
            (task) => task.status === "done"
        ).length || 0;

    const progress =
        totalTasks === 0
            ? 0
            : Math.round(
                (completedTasks / totalTasks) * 100
            );

    return (
        <Link href={`/project/${project._id}`}>
            <div className="bg-white/5 border border-white/10 hover:border-blue-500/30 transition rounded-2xl p-5 cursor-pointer">

                {/* TOP SECTION */}
                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        {/* INITIAL */}
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white">
                            {initial}
                        </div>

                        {/* INFO */}
                        <div>
                            <h3 className="text-lg font-semibold text-white">
                                {project.title}
                            </h3>

                            <p className="text-sm text-slate-400 mt-1">
                                {shortDescription}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="hidden md:flex flex-col items-end">
                        <p className="text-xl font-bold text-white">
                            {progress}%
                        </p>

                        <p className="text-xs text-slate-500">
                            Completed
                        </p>
                    </div>
                </div>


            </div>
        </Link>
    );
}
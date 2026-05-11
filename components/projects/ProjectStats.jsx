// components/project/ProjectStats.jsx

"use client";

import {
    FolderKanban,
    CheckCircle2,
    Users,
} from "lucide-react";

import StatsCard from "./StatsCard";

const ProjectStats = ({
    totalTasks,
    completedTasks,
    totalMembers,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <StatsCard
                title="Total Tasks"
                value={totalTasks}
                icon={FolderKanban}
                iconBg="bg-blue-500/20"
                iconColor="text-blue-400"
            />

            <StatsCard
                title="Completed"
                value={completedTasks}
                icon={CheckCircle2}
                iconBg="bg-emerald-500/20"
                iconColor="text-emerald-400"
            />

            <StatsCard
                title="Team Members"
                value={totalMembers}
                icon={Users}
                iconBg="bg-purple-500/20"
                iconColor="text-purple-400"
            />
        </div>
    );
};

export default ProjectStats;
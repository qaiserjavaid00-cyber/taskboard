"use client";

import { Plus, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { TaskSkeleton } from "@/components/skeletons/TaskSkeleton";
import TaskCard from "./TaskCard";

const statusColors = {
    todo: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    "in-progress":
        "bg-blue-100 text-blue-700 border border-blue-200",
    done: "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

const priorityColors = {
    high: "text-red-500",
    medium: "text-orange-500",
    low: "text-green-500",
};

const ProjectTasksSection = ({
    tasks,
    isLoading,
    isError,
    setOpenTaskModal,
}) => {
    const router = useRouter();

    return (
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold">
                        Tasks
                    </h2>

                    <p className="text-slate-400 text-sm mt-1">
                        Track project progress & priorities
                    </p>
                </div>

                <button
                    onClick={() => setOpenTaskModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium"
                >
                    <Plus size={16} />
                    New Task
                </button>
            </div>

            {/* LOADING */}
            {isLoading && <TaskSkeleton />}

            {/* ERROR */}
            {isError && (
                <div className="flex items-center gap-2 text-red-400">
                    <AlertCircle size={18} />
                    Failed to load tasks
                </div>
            )}

            {/* EMPTY */}
            {!isLoading && tasks?.length === 0 && (
                <div className="text-slate-400 border border-dashed border-white/10 rounded-xl p-10 text-center">
                    No tasks found.
                </div>
            )}

            {/* TASKS */}
            <div className="space-y-4">
                {tasks?.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectTasksSection;
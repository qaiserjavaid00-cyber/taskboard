// components/project/TaskCard.jsx

"use client";

import { useRouter } from "next/navigation";

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

const TaskCard = ({ task }) => {
    const router = useRouter();

    return (
        <div className="bg-[#111827] border border-white/5 hover:border-blue-500/30 transition rounded-2xl p-5">
            <div className="flex justify-between items-start">
                {/* LEFT */}
                <div>
                    <h3 className="font-semibold text-lg">
                        {task.title}
                    </h3>

                    <div className="flex items-center gap-3 mt-3">
                        {/* STATUS */}
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status] ||
                                "bg-slate-700 text-slate-300"
                                }`}
                        >
                            {task.status}
                        </span>

                        {/* PRIORITY */}
                        <span
                            className={`text-sm font-medium capitalize ${priorityColors[
                                task.priority
                                ] || "text-slate-300"
                                }`}
                        >
                            {task.priority} Priority
                        </span>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-end justify-start gap-3">
                    <button
                        onClick={() =>
                            router.push(`/tasks/${task._id}`)
                        }
                        className="text-sm text-slate-400 hover:text-white transition"
                    >
                        View
                    </button>

                    {/* ASSIGNEES */}
                    {task.assignees?.length > 0 && (
                        <div className="flex items-center gap-2">
                            {task.assignees.map((user) => (
                                <div
                                    key={user._id}
                                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold"
                                    title={user.name}
                                >
                                    {user.name?.charAt(0)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
import { Flag } from "lucide-react";

const statusStyles = {
    todo: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",

    "in-progress":
        "bg-blue-500/15 text-blue-400 border border-blue-500/20",

    done: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
};

const priorityStyles = {
    low: "text-emerald-400",
    medium: "text-orange-400",
    high: "text-red-400",
};

export default function TaskOverviewCard({ task }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex flex-wrap items-center gap-3 mb-5">
                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[task.status]
                        }`}
                >
                    {task.status}
                </span>

                <div className="flex items-center gap-2 text-sm">
                    <Flag
                        size={16}
                        className={
                            priorityStyles[task.priority]
                        }
                    />

                    <span className="capitalize text-slate-300">
                        {task.priority} Priority
                    </span>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">
                Description
            </h2>

            <p className="text-slate-300 leading-7">
                {task.description ||
                    "No description provided."}
            </p>
        </div>
    );
}
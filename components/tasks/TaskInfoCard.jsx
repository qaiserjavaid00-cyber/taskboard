import {
    CalendarDays,
    CheckCircle2,
    Clock3,
} from "lucide-react";

import TaskMetaItem from "./TaskMetaItem";

export default function TaskInfoCard({ task }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-5">
                Task Info
            </h2>

            <div className="space-y-5">
                {/* CREATED BY */}
                <div>
                    <p className="text-sm text-slate-400 mb-2">
                        Created By
                    </p>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center font-semibold">
                            {task.createdBy?.name?.charAt(0)}
                        </div>

                        <div>
                            <p className="font-medium">
                                {task.createdBy?.name}
                            </p>

                            <p className="text-xs text-slate-400">
                                {task.createdBy?.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ASSIGNEES */}
                <div>
                    <p className="text-sm text-slate-400 mb-3">
                        Assignees
                    </p>

                    <div className="space-y-3">
                        {task.assignees?.length > 0 ? (
                            task.assignees.map((user) => (
                                <div
                                    key={user._id}
                                    className="flex items-center justify-between bg-[#111827] border border-white/5 rounded-xl px-4 py-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-semibold">
                                            {user.name?.charAt(0)}
                                        </div>

                                        <div>
                                            <p className="font-medium">
                                                {user.name}
                                            </p>

                                            <p className="text-xs text-slate-400">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    <CheckCircle2
                                        size={18}
                                        className="text-emerald-400"
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="text-slate-400 text-sm">
                                No assignees
                            </div>
                        )}
                    </div>
                </div>

                {/* DUE DATE */}
                <div>
                    <p className="text-sm text-slate-400 mb-2">
                        Due Date
                    </p>

                    <TaskMetaItem
                        icon={CalendarDays}
                        iconClassName="text-orange-400"
                        title={
                            task.dueDate
                                ? new Date(
                                    task.dueDate
                                ).toLocaleDateString()
                                : "No due date"
                        }
                        subtitle="Deadline"
                    />
                </div>

                {/* CREATED */}
                <div>
                    <p className="text-sm text-slate-400 mb-2">
                        Created
                    </p>

                    <TaskMetaItem
                        icon={Clock3}
                        iconClassName="text-blue-400"
                        title={new Date(
                            task.createdAt
                        ).toLocaleDateString()}
                        subtitle="Creation date"
                    />
                </div>
            </div>
        </div>
    );
}
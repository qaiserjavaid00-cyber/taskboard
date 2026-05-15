import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

export default function TaskDetailsHeader({
    task,
    onEdit,
    onDelete,
}) {
    return (
        <div className="border-b border-white/10 bg-white/5 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-400">
                        Task Details
                    </p>

                    <h1 className="text-3xl font-bold mt-1">
                        {task.title}
                    </h1>

                    <p className="text-sm text-slate-400">
                        <Link href={`/project/${task?.project?._id}`}>
                            {task.project?.title}
                        </Link>
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onEdit}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                    >
                        <Pencil size={16} />
                        Edit
                    </button>

                    <button
                        onClick={onDelete}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
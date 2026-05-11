"use client";

import CreateTaskModal from "@/components/tasks/CreateTaskModal";
import DeleteConfirmModal from "@/components/ui/deleteConfirmModal";
import { useTask } from "@/hooks/tasks/useTasks";
import { useDeleteTask } from "@/hooks/tasks/useTasks";
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    Flag,
    MessageSquare,
    Paperclip,
    Pencil,
    Trash2,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskDetailsSkeleton } from "@/components/skeletons/TaskDetailSkeleton";
import Link from "next/link";


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

export default function TaskDetailsPage({ params }) {
    const router = useRouter();
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const taskId = params.id;
    const { data: task, isLoading, isError, } = useTask(taskId);
    const deleteTask = useDeleteTask(task?.project);

    if (isLoading) return <TaskDetailsSkeleton />

    if (isError || !task) {
        return (
            <div className="min-h-screen bg-[#0f172a] text-red-400 flex items-center justify-center">
                Failed to load task
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-white">
            {/* TOP BAR */}
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
                            onClick={() => setOpenEdit(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                            <Pencil size={16} />
                            Edit
                        </button>

                        <button
                            onClick={() => setOpenDelete(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition">
                            <Trash2 size={16} />
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* MAIN */}
                <div className="lg:col-span-2 space-y-6">
                    {/* OVERVIEW */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex flex-wrap items-center gap-3 mb-5">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[
                                    task.status
                                ]
                                    }`}
                            >
                                {task.status}
                            </span>

                            <div className="flex items-center gap-2 text-sm">
                                <Flag
                                    size={16}
                                    className={
                                        priorityStyles[
                                        task.priority
                                        ]
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

                    {/* COMMENTS */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <MessageSquare className="text-blue-400" />

                            <h2 className="text-xl font-semibold">
                                Discussion
                            </h2>
                        </div>

                        <div className="mb-6">
                            <textarea
                                placeholder="Write a comment..."
                                className="w-full bg-[#111827] border border-white/10 rounded-xl p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={4}
                            />

                            <div className="flex justify-between items-center mt-3">
                                <button className="flex items-center gap-2 text-slate-400 hover:text-white transition">
                                    <Paperclip size={16} />
                                    Attach File
                                </button>

                                <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl font-medium">
                                    Comment
                                </button>
                            </div>
                        </div>

                        {/* EMPTY COMMENTS */}
                        <div className="border border-dashed border-white/10 rounded-xl p-8 text-center text-slate-400">
                            No comments yet
                        </div>
                    </div>
                </div>

                {/* SIDEBAR */}
                <div className="space-y-6">
                    {/* META */}
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
                                        {task.createdBy?.name?.charAt(
                                            0
                                        )}
                                    </div>

                                    <div>
                                        <p className="font-medium">
                                            {
                                                task.createdBy
                                                    ?.name
                                            }
                                        </p>

                                        <p className="text-xs text-slate-400">
                                            {
                                                task.createdBy
                                                    ?.email
                                            }
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
                                    {task.assignees?.length >
                                        0 ? (
                                        task.assignees.map(
                                            (user) => (
                                                <div
                                                    key={
                                                        user._id
                                                    }
                                                    className="flex items-center justify-between bg-[#111827] border border-white/5 rounded-xl px-4 py-3"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-semibold">
                                                            {user.name?.charAt(
                                                                0
                                                            )}
                                                        </div>

                                                        <div>
                                                            <p className="font-medium">
                                                                {
                                                                    user.name
                                                                }
                                                            </p>

                                                            <p className="text-xs text-slate-400">
                                                                {
                                                                    user.email
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <CheckCircle2
                                                        size={
                                                            18
                                                        }
                                                        className="text-emerald-400"
                                                    />
                                                </div>
                                            )
                                        )
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

                                <div className="flex items-center gap-3 bg-[#111827] border border-white/5 rounded-xl px-4 py-3">
                                    <CalendarDays className="text-orange-400" />

                                    <div>
                                        <p className="font-medium">
                                            {task.dueDate
                                                ? new Date(
                                                    task.dueDate
                                                ).toLocaleDateString()
                                                : "No due date"}
                                        </p>

                                        <p className="text-xs text-slate-400">
                                            Deadline
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* CREATED */}
                            <div>
                                <p className="text-sm text-slate-400 mb-2">
                                    Created
                                </p>

                                <div className="flex items-center gap-3 bg-[#111827] border border-white/5 rounded-xl px-4 py-3">
                                    <Clock3 className="text-blue-400" />

                                    <div>
                                        <p className="font-medium">
                                            {new Date(
                                                task.createdAt
                                            ).toLocaleDateString()}
                                        </p>

                                        <p className="text-xs text-slate-400">
                                            Creation date
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACTIVITY */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h2 className="text-lg font-semibold mb-5">
                            Activity
                        </h2>

                        <div className="space-y-5">
                            <div className="flex gap-3">
                                <div className="w-3 h-3 rounded-full bg-blue-500 mt-2"></div>

                                <div>
                                    <p className="text-sm text-slate-300">
                                        Task status:
                                        <span className="text-blue-400">
                                            {" "}
                                            {task.status}
                                        </span>
                                    </p>

                                    <p className="text-xs text-slate-500 mt-1">
                                        Latest update
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-3 h-3 rounded-full bg-purple-500 mt-2"></div>

                                <div>
                                    <p className="text-sm text-slate-300">
                                        Task created
                                    </p>

                                    <p className="text-xs text-slate-500 mt-1">
                                        {new Date(
                                            task.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateTaskModal
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                projectId={task.project}
                members={task?.project?.members || []}
                mode="edit"
                task={task}
            />
            <DeleteConfirmModal
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                title="Delete Task"
                description="This action cannot be undone. The task will be permanently removed."
                loading={deleteTask.isPending}
                onConfirm={() => {
                    deleteTask.mutate(task._id, {
                        onSuccess: () => {
                            setOpenDelete(false);
                            router.push(`/project/${task?.project?._id}`);
                        },
                    });
                }}
            />
        </div>
    );
}
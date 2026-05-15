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
import TaskDetailsHeader from "@/components/tasks/TaskDetailsHeader";
import TaskOverviewCard from "@/components/tasks/TaskOverviewCard";
import TaskDiscussionSection from "@/components/tasks/TaskDiscussionSection";
import TaskInfoCard from "@/components/tasks/TaskInfoCard";
import TaskActivityCard from "@/components/tasks/TaskActivityCard";


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
                {/* <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
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
                </div> */}
                <TaskDetailsHeader
                    task={task}
                    onEdit={() => setOpenEdit(true)}
                    onDelete={() => setOpenDelete(true)}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* MAIN */}
                <div className="lg:col-span-2 space-y-6">
                    {/* OVERVIEW */}
                    {/* <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
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
                    </div> */}
                    <TaskOverviewCard task={task} />

                    {/* COMMENTS */}
                    <TaskDiscussionSection />
                </div>

                {/* SIDEBAR */}
                <div className="space-y-6">

                    <TaskInfoCard task={task} />

                    {/* ACTIVITY */}
                    {/* <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
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
                    </div> */}
                    <TaskActivityCard task={task} />
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
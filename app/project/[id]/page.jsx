"use client";

import { useState } from "react";
import { useQueryClient, } from "@tanstack/react-query";
import { Users, FolderKanban, CheckCircle2, Clock3, AlertCircle, Plus, } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateTaskModal from "@/components/tasks/CreateTaskModal";
import { useTasks } from "@/hooks/tasks/useTasks";
import { useAddMemberToProject, useGetUsers, useRemoveMemberFromProject } from "@/hooks/users/useUsers";
import { TaskSkeleton } from "@/components/skeletons/TaskSkeleton";
import { TeamSkeleton } from "@/components/skeletons/TeamSkeleton";
import { StatsSkeleton } from "@/components/skeletons/StatsSkeleton";
import { useGetProject } from "@/hooks/projects/useProjects";
import Link from "next/link";


const statusColors = {
    todo: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    "in-progress": "bg-blue-100 text-blue-700 border border-blue-200",
    done: "bg-emerald-100 text-emerald-700 border border-emerald-200",
};
const priorityColors = {
    high: "text-red-500",
    medium: "text-orange-500",
    low: "text-green-500",
};

const ProjectDetailsPage = ({ params }) => {
    const router = useRouter();
    const projectId = params.id;

    const queryClient = useQueryClient();

    const [selectedUser, setSelectedUser] = useState("");

    const [openTaskModal, setOpenTaskModal] = useState(false);
    // TASKS
    const { data: tasks, isLoading, isError, } = useTasks(projectId)
    // USERS
    const { data: users, isLoading: usersLoading } = useGetUsers()
    // PROJECT
    const { data: project } = useGetProject(projectId)

    const removeMember = useRemoveMemberFromProject(projectId);
    const addMember = useAddMemberToProject(projectId)

    const handleAddMember = () => {
        addMember.mutate(
            {
                userId: selectedUser,
            },
            {
                onSuccess: () => {
                    setSelectedUser("");
                },
            }
        );
    };


    const availableUsers = users?.filter((user) => {
        const isAlreadyMember = project?.members?.some(
            (m) => m._id === user._id
        );

        const isAdmin = user.role === "admin";

        return !isAlreadyMember && !isAdmin;
    });

    const completedTasks =
        tasks?.filter(
            (task) => task.status === "done"
        ).length || 0;

    return (
        <div className="min-h-screen bg-[#0f172a] text-white">
            {/* TOP HEADER */}
            <div className="border-b border-white/10 bg-white/5 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-blue-600">
                                    <FolderKanban size={24} />
                                </div>

                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight">
                                        <Link href="/dashboard"> Project Dashboard</Link>
                                    </h1>

                                    <p className="text-slate-400 mt-1">
                                        Manage tasks, members &
                                        workflow
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl">
                            <Clock3
                                size={18}
                                className="text-blue-400"
                            />

                            <div>
                                <p className="text-xs text-slate-400">
                                    {projectId}
                                </p>

                                <p className="font-medium">
                                    {project?.title}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6 space-y-6">
                {/* STATS */}
                {isLoading ? <StatsSkeleton /> : <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-slate-400 text-sm">
                                    Total Tasks
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {tasks?.length || 0}
                                </h2>
                            </div>

                            <div className="p-3 rounded-xl bg-blue-500/20">
                                <FolderKanban className="text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-slate-400 text-sm">
                                    Completed
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {completedTasks}
                                </h2>
                            </div>

                            <div className="p-3 rounded-xl bg-emerald-500/20">
                                <CheckCircle2 className="text-emerald-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-slate-400 text-sm">
                                    Team Members
                                </p>
                                <h2 className="text-3xl font-bold mt-2">
                                    {project?.members?.length || 0}
                                </h2>
                            </div>

                            <div className="p-3 rounded-xl bg-purple-500/20">
                                <Users className="text-purple-400" />
                            </div>
                        </div>
                    </div>
                </div>}

                {/* MAIN CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* TASKS */}
                    <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Tasks
                                </h2>

                                <p className="text-slate-400 text-sm mt-1">
                                    Track project progress &
                                    priorities
                                </p>
                            </div>

                            <button
                                onClick={() => setOpenTaskModal(true)}
                                className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium">
                                <Plus size={16} />
                                New Task
                            </button>
                        </div>

                        {/* {isLoading && (
                            <div className="text-slate-400">
                                Loading tasks...
                            </div>
                            
                        )} */}
                        {isLoading && <TaskSkeleton />}
                        {isError && (
                            <div className="flex items-center gap-2 text-red-400">
                                <AlertCircle size={18} />
                                Failed to load tasks
                            </div>
                        )}

                        {!isLoading &&
                            tasks?.length === 0 && (
                                <div className="text-slate-400 border border-dashed border-white/10 rounded-xl p-10 text-center">
                                    No tasks found.
                                </div>
                            )}

                        <div className="space-y-4">
                            {tasks?.map((task) => (
                                <div
                                    key={task._id}
                                    className="bg-[#111827] border border-white/5 hover:border-blue-500/30 transition rounded-2xl p-5"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                {task.title}
                                            </h3>

                                            <div className="flex items-center gap-3 mt-3">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[
                                                        task
                                                            .status
                                                    ] ||
                                                        "bg-slate-700 text-slate-300"
                                                        }`}
                                                >
                                                    {task.status}
                                                </span>

                                                <span
                                                    className={`text-sm font-medium capitalize ${priorityColors[
                                                        task
                                                            .priority
                                                    ] ||
                                                        "text-slate-300"
                                                        }`}
                                                >
                                                    {task.priority} Priority
                                                </span>
                                            </div>

                                        </div>

                                        <div className="flex flex-col items-end justify-start gap-3">
                                            {/* VIEW BUTTON - always top right */}
                                            <button
                                                onClick={() => router.push(`/tasks/${task._id}`)}
                                                className="text-sm text-slate-400 hover:text-white transition"
                                            >
                                                View
                                            </button>

                                            {/* AVATARS - always aligned right */}
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
                            ))}
                        </div>
                    </div>

                    {/* TEAM SECTION */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-xl bg-purple-500/20">
                                <Users className="text-purple-400" />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold">
                                    Team Members
                                </h2>

                                <p className="text-slate-400 text-sm">
                                    Invite people to collaborate
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <select
                                className="w-full bg-[#111827] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={selectedUser}
                                onChange={(e) =>
                                    setSelectedUser(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Select user
                                </option>

                                {availableUsers?.map((user) => (
                                    <option
                                        key={user._id}
                                        value={user._id}
                                    >
                                        {user.name} (
                                        {user.email})
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={handleAddMember}
                                disabled={!selectedUser || addMember.isPending}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 transition py-3 rounded-xl font-medium"
                            >
                                {addMember.isPending ? "Adding Member..." : "Add Member"}
                            </button>
                        </div>

                        {/* MEMBER PLACEHOLDER */}
                        {usersLoading ? <TeamSkeleton /> : <div className="mt-8">
                            <h3 className="text-sm font-medium text-slate-400 mb-3">
                                Active Team by <span className="font-bold italic text-emerald-700">{project?.owner?.name}</span>
                            </h3>

                            <div className="space-y-3">

                                {project?.members?.map((user) => (
                                    <div
                                        key={user._id}
                                        className="flex items-center justify-between bg-[#111827] border border-white/5 rounded-xl px-4 py-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-semibold">
                                                {user.name?.charAt(0)}
                                            </div>

                                            <div>
                                                <p className="font-medium">{user.name}</p>
                                                <p className="text-xs text-slate-400">{user.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-emerald-400">
                                                Active
                                            </span>

                                            {/* ❌ REMOVE BUTTON */}
                                            {project?.owner?._id !== user._id && (
                                                <button
                                                    onClick={() => {
                                                        removeMember.mutate(user._id);
                                                    }}
                                                    className="text-red-400 hover:text-red-300 text-lg font-bold"
                                                    title="Remove member"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            <CreateTaskModal
                isOpen={openTaskModal}
                onClose={() => setOpenTaskModal(false)}
                projectId={projectId}
                members={project?.members || []}
            />
        </div>
    );
};

export default ProjectDetailsPage;
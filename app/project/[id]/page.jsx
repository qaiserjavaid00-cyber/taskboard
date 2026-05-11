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
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectStats from "@/components/projects/ProjectStats";
import ProjectTasksSection from "@/components/tasks/ProjectTasksSection";
import ProjectTeamSection from "@/components/projects/ProjectsTeamSection";


// const statusColors = {
//     todo: "bg-yellow-100 text-yellow-700 border border-yellow-200",
//     "in-progress": "bg-blue-100 text-blue-700 border border-blue-200",
//     done: "bg-emerald-100 text-emerald-700 border border-emerald-200",
// };
// const priorityColors = {
//     high: "text-red-500",
//     medium: "text-orange-500",
//     low: "text-green-500",
// };

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

            <ProjectHeader
                projectId={projectId}
                projectTitle={project?.title}
            />

            <div className="max-w-7xl mx-auto p-6 space-y-6">
                {/* STATS */}
                {isLoading ? <StatsSkeleton /> :

                    <ProjectStats
                        totalTasks={tasks?.length || 0}
                        completedTasks={completedTasks}
                        totalMembers={project?.members?.length || 0}
                    />
                }

                {/* MAIN CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* TASKS */}
                    <ProjectTasksSection
                        tasks={tasks}
                        isLoading={isLoading}
                        isError={isError}
                        setOpenTaskModal={setOpenTaskModal}
                    />
                    {/* TEAM SECTION */}

                    <ProjectTeamSection
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                        availableUsers={availableUsers}
                        handleAddMember={handleAddMember}
                        addMember={addMember}
                        usersLoading={usersLoading}
                        project={project}
                        removeMember={removeMember}
                    />
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
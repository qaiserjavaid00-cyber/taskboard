"use client";

import { useQuery } from "@tanstack/react-query";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProjectList from "@/components/dashboard/ProjectList";
import StatsCards from "@/components/dashboard/StatsCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useTasks } from "@/hooks/tasks/useTasks";
import { ProjectCardSkeleton } from "@/components/skeletons/ProjectCard";
import { StatsSkeleton } from "@/components/skeletons/StatsSkeleton";
import { useGetProjects } from "@/hooks/projects/useProjects";

export default function DashboardPage() {

    const { data, isLoading, isError } = useGetProjects();
    const { data: tasks } = useTasks();

    const ownedProjects = data?.ownedProjects || [];
    const teamProjects = data?.teamProjects || [];

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <div className="min-h-screen bg-[#0f172a] text-white">
                    <div className="p-6 space-y-8">

                        {isError && (
                            <p className="text-red-400">
                                Failed to load projects
                            </p>
                        )}

                        {isLoading ? (
                            <>
                                <StatsSkeleton />
                                <div className="space-y-4">
                                    <ProjectCardSkeleton />
                                    <ProjectCardSkeleton />
                                </div>
                            </>
                        ) : (
                            <>
                                <StatsCards
                                    tasks={tasks || []}
                                    projects={[
                                        ...ownedProjects,
                                        ...teamProjects,
                                    ]}
                                />

                                <div>
                                    <h2 className="text-2xl font-bold">
                                        My Projects
                                    </h2>

                                    <ProjectList
                                        projects={ownedProjects}
                                    />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold">
                                        Team Projects
                                    </h2>

                                    <ProjectList
                                        projects={teamProjects}
                                    />
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
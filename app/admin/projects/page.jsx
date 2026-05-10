"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProjectList from "@/components/dashboard/ProjectList";
import AdminRoute from "@/components/auth/AdminRoute";
import { useAdminProjects } from "@/hooks/admin/useAdmin";
import { ProjectCardSkeleton } from "@/components/skeletons/ProjectCArd";

export default function AdminPage() {
    const {
        data: projects,
        isLoading,
        isError,
        error,
    } = useAdminProjects();

    return (
        <AdminRoute>
            <DashboardLayout>
                <div className="min-h-screen bg-[#0f172a] text-white">
                    <div className="p-6 space-y-8">

                        {isError && (
                            <p className="text-red-400">
                                {error.message}
                            </p>
                        )}

                        {isLoading ? (
                            <div className="space-y-4">
                                <ProjectCardSkeleton />
                                <ProjectCardSkeleton />
                            </div>
                        ) : (
                            <>
                                <h1 className="text-2xl font-bold mb-2">
                                    Admin Dashboard
                                </h1>

                                <ProjectList
                                    projects={projects || []}
                                />
                            </>
                        )}

                    </div>
                </div>
            </DashboardLayout>
        </AdminRoute>
    );
}
"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
// import StatsCards from "@/components/dashboard/StatsCards";
// import ProjectList from "@/components/dashboard/ProjectList";
// import { useProjects } from "@/hooks/useProjects";

export default function Home() {
  // const { data: projects = [], isLoading } = useProjects();

  // if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <h2>HOME</h2> {/* <StatsCards projects={projects} />
      <ProjectList projects={projects} /> */}
    </>
  );
}
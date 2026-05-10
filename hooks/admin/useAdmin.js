"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminProjects } from "@/lib/api/admin";

export function useAdminProjects() {
    return useQuery({
        queryKey: ["admin-projects"],
        queryFn: getAdminProjects,
    });
}
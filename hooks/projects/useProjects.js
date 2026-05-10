"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, getProject, createProject, } from "@/lib/api/projects";

// ALL PROJECTS
export const useGetProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: getProjects,
    });
};

// SINGLE PROJECT
export const useGetProject = (projectId) => {
    return useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getProject(projectId),
        enabled: !!projectId,
    });
};

// CREATE PROJECT
export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProject,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
        },
    });
};
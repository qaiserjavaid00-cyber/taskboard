"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, getProject, createProject, updateProject, deleteProject, } from "@/lib/api/projects";


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


//UPDATE 
export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) =>
            updateProject(id, data),

        onSuccess: (updatedProject) => {
            // update single project cache
            queryClient.setQueryData(
                ["project", updatedProject._id],
                updatedProject
            );

            // refresh project lists
            queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
        },
    });
};

//DELETE
export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteProject(id),

        onSuccess: (_, id) => {
            // optional safety (not required)
            queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
        },
    });
};
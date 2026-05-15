

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addMemberToProject, getMe, removeMemberFromProject, getUsers, logoutUser } from "@/lib/api/users";
import { useRouter } from "next/navigation";

export const useRemoveMemberFromProject = (projectId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId) =>
            removeMemberFromProject(projectId, userId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["project", projectId],
            });
            queryClient.invalidateQueries({
                queryKey: ["tasks", projectId],
            });
        },
    });
};

export const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        retry: false, // important (no spam retries on 401)
    });
};

// GET USERS
export const useGetUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });
};


// ADD MEMBER
export const useAddMemberToProject = (projectId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId }) =>
            addMemberToProject(projectId, userId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["project", projectId],
            });
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: logoutUser,

        onSuccess: () => {
            queryClient.clear();
            router.push("/login");
        },
    });
};
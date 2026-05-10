"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTask,
} from "@/lib/api/tasks";

/* ======================================================
   GET TASKS
====================================================== */

export const useTasks = (projectId) => {
    return useQuery({
        queryKey: ["tasks", projectId],
        queryFn: () => getTasks(projectId),

        enabled: !!projectId,
    });
};

/* ======================================================
   CREATE TASK
====================================================== */

export const useCreateTask = (projectId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) =>
            createTask(projectId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks", projectId],
            });
        },
    });
};

///////OPTIMISTIC///////////////

export const useUpdateTask = (projectId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ taskId, data }) =>
            updateTask(taskId, data),

        onMutate: async ({ taskId, data }) => {
            // cancel ongoing fetches
            await queryClient.cancelQueries({
                queryKey: ["tasks", projectId],
            });

            await queryClient.cancelQueries({
                queryKey: ["task", taskId],
            });

            // snapshot previous state
            const previousTasks = queryClient.getQueryData([
                "tasks",
                projectId,
            ]);

            const previousTask = queryClient.getQueryData([
                "task",
                taskId,
            ]);

            // OPTIMISTIC UPDATE: list
            queryClient.setQueryData(
                ["tasks", projectId],
                (old = []) =>
                    old.map((t) =>
                        t._id === taskId
                            ? { ...t, ...data }
                            : t
                    )
            );

            // OPTIMISTIC UPDATE: single task
            queryClient.setQueryData(
                ["task", taskId],
                (old) =>
                    old ? { ...old, ...data } : old
            );

            return { previousTasks, previousTask };
        },

        onError: (err, variables, context) => {
            // rollback if failed
            queryClient.setQueryData(
                ["tasks", projectId],
                context.previousTasks
            );

            queryClient.setQueryData(
                ["task", variables.taskId],
                context.previousTask
            );
        },

        onSuccess: (updatedTask, variables) => {
            // sync server response (important for populated fields)
            queryClient.setQueryData(
                ["task", variables.taskId],
                updatedTask
            );
        },

        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["tasks", projectId],
            });

            queryClient.invalidateQueries({
                queryKey: ["task", variables.taskId],
            });
        },
    });
};

/* ======================================================
   UPDATE TASK
====================================================== */

// export const useUpdateTask = (projectId) => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: ({ taskId, data }) =>
//             updateTask(taskId, data),

//         onSuccess: (updatedTask, variables) => {
//             // refresh task list
//             queryClient.invalidateQueries({
//                 queryKey: ["tasks", projectId],
//             });

//             // refresh single task
//             queryClient.invalidateQueries({
//                 queryKey: ["task", variables.taskId],
//             });
//         },
//     });
// };


/* ======================================================
   DELETE TASK
====================================================== */

export const useDeleteTask = (projectId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (taskId) =>
            deleteTask(taskId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks", projectId],
            });
        },
    });
};


/* ======================================================
   GET TASK by ID
====================================================== */


export const useTask = (taskId) => {
    return useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTask(taskId),
        enabled: !!taskId,
    });
};
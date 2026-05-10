import api from "./axios";

// GET TASKS
export const getTasks = async (projectId) => {
    const res = await api.get(`/projects/${projectId}/tasks`);
    return res.data;
};

// CREATE TASK
export const createTask = async (projectId, data) => {
    const res = await api.post(
        `/projects/${projectId}/tasks`,
        data
    );
    return res.data;
};

// UPDATE TASK
export const updateTask = async (taskId, data) => {
    const res = await api.patch(`/tasks/${taskId}`, data);
    return res.data;
};

// DELETE TASK
export const deleteTask = async (taskId) => {
    const res = await api.delete(`/tasks/${taskId}`);
    return res.data;
};


// GET task by Id

export const getTask = async (taskId) => {
    const res = await api.get(`/tasks/${taskId}`);
    return res.data;
};
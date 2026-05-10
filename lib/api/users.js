import api from "./axios";

export const getUsers = async () => {
    const res = await api.get(`/users`);
    return res.data;
};

export const addMemberToProject = async (projectId, userId) => {
    const res = await api.post(`/projects/${projectId}/members`, {
        userId,
    });
    return res.data;
};

export const removeMemberFromProject = async (projectId, userId) => {
    const res = await api.delete(`/projects/${projectId}/members`, {
        data: { userId },
    });

    return res.data;
};

export const getMe = async () => {
    const res = await api.get("/auth/me", {
        withCredentials: true,
    });

    return res.data.user;
};

export const logoutUser = async () => {
    const res = await api.post("/auth/logout", {});

    return res.data;
};
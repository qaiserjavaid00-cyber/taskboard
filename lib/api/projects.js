import api from "./axios";

export const createProject = async (data) => {
    const res = await api.post("/projects", data);
    return res.data;
};

export const getProjects = async () => {
    const res = await api.get("/projects");
    return res.data;
};

export const getProject = async (id) => {
    const res = await api.get(`/projects/${id}`);
    return res.data;
};
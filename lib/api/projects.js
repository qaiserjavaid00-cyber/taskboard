// import api from "./axios";

// export const createProject = async (data) => {
//     const res = await api.post("/projects", data);
//     return res.data;
// };

// export const getProjects = async () => {
//     const res = await api.get("/projects");
//     return res.data;
// };

// export const getProject = async (id) => {
//     const res = await api.get(`/projects/${id}`);
//     return res.data;
// };

import api from "./axios";

// CREATE PROJECT
export const createProject = async (data) => {
    const res = await api.post("/projects", data);
    return res.data;
};

// GET ALL PROJECTS
export const getProjects = async () => {
    const res = await api.get("/projects");
    return res.data;
};

// GET SINGLE PROJECT
export const getProject = async (id) => {
    const res = await api.get(`/projects/${id}`);
    return res.data;
};

// UPDATE PROJECT
export const updateProject = async (id, data) => {
    const res = await api.patch(`/projects/${id}`, data);
    return res.data;
};

// DELETE PROJECT
export const deleteProject = async (id) => {
    const res = await api.delete(`/projects/${id}`);
    return res.data;
};
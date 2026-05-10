import api from "./axios";

export const getAdminProjects = async () => {
    const res = await api.get("/admin/projects");
    return res.data;
};

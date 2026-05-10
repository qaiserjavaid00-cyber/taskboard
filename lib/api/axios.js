import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (
//             error.response?.status === 401 &&
//             !originalRequest._retry &&
//             originalRequest.url !== "/auth/refresh"
//         ) {
//             originalRequest._retry = true;

//             try {
//                 await api.post("/auth/refresh");
//                 return api(originalRequest);
//             } catch (err) {
//                 if (typeof window !== "undefined") {
//                     window.location.href = "/login";
//                 }
//                 return Promise.reject(err);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

let isRefreshing = false;

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        if (originalRequest.url.includes("/auth/refresh")) {
            window.location.href = "/login";
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            await api.post("/auth/refresh");
            isRefreshing = false;
            return api(originalRequest);
        } catch (err) {
            isRefreshing = false;
            window.location.href = "/login";
            return Promise.reject(err);
        }
    }
);

export default api;
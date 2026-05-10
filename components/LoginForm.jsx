"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validators/auth";
import api from "@/lib/api/axios";

export default function LoginForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    // const mutation = useMutation({
    //     mutationFn: (data) => api.post("/auth/login", data),

    //     onSuccess: () => {
    //         router.push("/dashboard");
    //     },
    // });

    const mutation = useMutation({
        mutationFn: (data) => api.post("/auth/login", data),

        onSuccess: (response) => {
            console.log("SUCCESS RESPONSE:", response);

            const user = response.data.user;
            console.log("User From Login", user)
            if (user?.role === "admin") {
                router.push("/admin/projects");
            } else {
                router.push("/dashboard");
            }
        },

        onError: (error) => {
            console.log("❌ FULL ERROR OBJECT:", error);
            console.log("❌ ERROR RESPONSE:", error?.response);
            console.log("❌ ERROR DATA:", error?.response?.data);
            console.log("❌ ERROR MESSAGE:", error?.message);
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input
                placeholder="Email"
                {...register("email")}
                className="w-full border p-2 rounded"
            />
            {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full border p-2 rounded"
            />
            {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {mutation.isError && (
                <p className="text-red-500 text-sm">
                    {mutation.error?.response?.data?.message || "Login failed"}
                </p>
            )}

            <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-blue-600 text-white py-2 rounded"
            >
                {mutation.isPending ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}
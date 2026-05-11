"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validators/auth";
import api from "@/lib/api/axios";
import { Loader2 } from "lucide-react";

export default function RegisterForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const mutation = useMutation({
        // mutationFn: (data) => api.post("/auth/register", data),
        mutationFn: (data) =>
            api.post("/auth/register", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            }),

        onSuccess: () => {
            router.push("/login");
        },
        onError: (error) => {
            console.log(error)
        },

    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input
                placeholder="Name"
                {...register("name")}
                className="w-full border p-2 rounded"
            />
            {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

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
                    {mutation.error?.response?.data?.message || "Register failed"}
                </p>
            )}

            <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-blue-600 text-white py-2 rounded"
            >
                {mutation.isPending ? <span className="flex gap-1"><Loader2 className="animate-spin" />wait...</span> : "Register"}
            </button>
        </form>
    );
}
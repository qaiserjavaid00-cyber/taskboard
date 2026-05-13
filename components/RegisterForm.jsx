"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validators/auth";
import api from "@/lib/api/axios";

import {
    Loader2,
    Mail,
    Lock,
    User,
} from "lucide-react";

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
            console.log(error);
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* NAME */}
            <div>
                <label className="text-sm text-slate-300 mb-2 block">
                    Full Name
                </label>

                <div className="relative">
                    <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                        placeholder="Enter your name"
                        {...register("name")}
                        className="w-full bg-[#111827] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                {errors.name && (
                    <p className="text-red-400 text-sm mt-2">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* EMAIL */}
            <div>
                <label className="text-sm text-slate-300 mb-2 block">
                    Email Address
                </label>

                <div className="relative">
                    <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                        placeholder="Enter your email"
                        {...register("email")}
                        className="w-full bg-[#111827] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                {errors.email && (
                    <p className="text-red-400 text-sm mt-2">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* PASSWORD */}
            <div>
                <label className="text-sm text-slate-300 mb-2 block">
                    Password
                </label>

                <div className="relative">
                    <Lock
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        {...register("password")}
                        className="w-full bg-[#111827] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                {errors.password && (
                    <p className="text-red-400 text-sm mt-2">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* ERROR */}
            {mutation.isError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                    <p className="text-red-400 text-sm">
                        {mutation.error?.response?.data?.message ||
                            "Register failed"}
                    </p>
                </div>
            )}

            {/* BUTTON */}
            <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-70"
            >
                {mutation.isPending ? (
                    <>
                        <Loader2
                            className="animate-spin"
                            size={18}
                        />
                        Please wait...
                    </>
                ) : (
                    "Create Account"
                )}
            </button>
        </form>
    );
}
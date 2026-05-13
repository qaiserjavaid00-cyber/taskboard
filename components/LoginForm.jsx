// "use client";

// import { useRouter } from "next/navigation";
// import { useMutation } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { loginSchema } from "@/lib/validators/auth";
// import api from "@/lib/api/axios";
// import { Loader2 } from "lucide-react";

// export default function LoginForm() {
//     const router = useRouter();

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm({
//         resolver: zodResolver(loginSchema),
//     });

//     const mutation = useMutation({
//         mutationFn: (data) => api.post("/auth/login", data),

//         onSuccess: (response) => {
//             console.log("SUCCESS RESPONSE:", response);

//             const user = response.data.user;
//             console.log("User From Login", user)
//             if (user?.role === "admin") {
//                 router.push("/admin/projects");
//             } else {
//                 router.push("/dashboard");
//             }
//         },

//         onError: (error) => {
//             console.log("❌ FULL ERROR OBJECT:", error);
//             console.log("❌ ERROR RESPONSE:", error?.response);
//             console.log("❌ ERROR DATA:", error?.response?.data);
//             console.log("❌ ERROR MESSAGE:", error?.message);
//         },
//     });

//     const onSubmit = (data) => {
//         mutation.mutate(data);
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
//             <input
//                 placeholder="Email"
//                 {...register("email")}
//                 className="w-full border p-2 rounded"
//             />
//             {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email.message}</p>
//             )}

//             <input
//                 type="password"
//                 placeholder="Password"
//                 {...register("password")}
//                 className="w-full border p-2 rounded"
//             />
//             {errors.password && (
//                 <p className="text-red-500 text-sm">{errors.password.message}</p>
//             )}

//             {mutation.isError && (
//                 <p className="text-red-500 text-sm">
//                     {mutation.error?.response?.data?.message || "Login failed"}
//                 </p>
//             )}

//             <button
//                 type="submit"
//                 disabled={mutation.isPending}
//                 className="w-full bg-blue-600 text-white py-2 rounded"
//             >
//                 {mutation.isPending ? <span className="flex justify-center items-center gap-1"><Loader2 className="animate-spin" />wait...</span> : "Login"}
//             </button>
//         </form>
//     );
// }

// components/LoginForm.jsx

"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validators/auth";
import api from "@/lib/api/axios";
import { Loader2, Mail, Lock } from "lucide-react";

export default function LoginForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const mutation = useMutation({
        mutationFn: (data) => api.post("/auth/login", data),

        onSuccess: (response) => {
            console.log("SUCCESS RESPONSE:", response);

            const user = response.data.user;
            console.log("User From Login", user);

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                            "Login failed"}
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
                        <Loader2 className="animate-spin" size={18} />
                        Please wait...
                    </>
                ) : (
                    "Login"
                )}
            </button>
        </form>
    );
}


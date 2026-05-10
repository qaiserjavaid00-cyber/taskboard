

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/hooks/users/useUsers";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const { data, isLoading, isError, error } = useMe();
    console.log("DATA", data)
    console.log("ERROR", error)
    useEffect(() => {
        if (!isLoading && isError) {
            router.replace("/login");
        }
    }, [isError, isLoading, router]);

    // while checking auth
    if (isLoading) {
        return (
            <div className="p-6 text-slate-400">
                Checking authentication...
            </div>
        );
    }

    // IMPORTANT: wait for valid data
    if (isError || !data) {
        return null;
    }

    return children;
}
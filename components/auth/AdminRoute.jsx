"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/hooks/users/useUsers";

export default function AdminRoute({ children }) {
    const router = useRouter();

    const { data, isLoading, isError } = useMe();

    useEffect(() => {
        // not logged in
        if (!isLoading && isError) {
            router.replace("/login");
        }

        // not admin
        if (!isLoading && data?.role !== "admin") {
            router.replace("/");
        }
    }, [isLoading, isError, data, router]);

    // loading
    if (isLoading) {
        return (
            <div className="p-6 text-slate-400">
                Checking authentication...
            </div>
        );
    }

    // block render
    if (isError || !data || data.role !== "admin") {
        return null;
    }

    return children;
}
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createProject } from "@/lib/api/projects";

export default function CreateProjectForm() {
    const queryClient = useQueryClient();
    const [serverError, setServerError] = useState("");

    const mutation = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            setServerError("");
        },
        onError: (error) => {
            setServerError("Failed to create project");
            console.log(error)
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
        };

        console.log("SUBMIT DATA:", data);

        mutation.mutate(data);
        e.target.reset();
    };

    return (
        <div className="p-4 rounded-xl shadow space-y-4 ">
            <h2 className="text-lg font-semibold">Create Project</h2>

            <form onSubmit={handleSubmit} className="space-y-3">

                {/* TITLE */}
                <Input
                    name="title"
                    placeholder="Project title"
                />

                {/* DESCRIPTION */}
                <Input
                    name="description"
                    placeholder="Description"
                />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? "Creating..." : "Create Project"}
                </Button>

                {serverError && (
                    <p className="text-red-500 text-sm">
                        {serverError}
                    </p>
                )}
            </form>
        </div>
    );
}
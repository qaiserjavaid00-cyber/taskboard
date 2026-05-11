

"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import {
    useCreateProject,
    useUpdateProject,
} from "@/hooks/projects/useProjects";

export default function UpdateProjectDialog({
    isOpen,
    onClose,
    mode = "create",
    project = null,
}) {
    const createProject = useCreateProject();
    const updateProject = useUpdateProject();

    const isEdit = mode === "edit";

    const [form, setForm] = useState({
        title: "",
        description: "",
    });

    // ✅ PREFILL WHEN EDIT OPENS
    useEffect(() => {
        if (isEdit && project && isOpen) {
            setForm({
                title: project.title || "",
                description: project.description || "",
            });
        }
    }, [isEdit, project, isOpen]);

    // INPUT CHANGE
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.title.trim()) return;

        // EDIT MODE
        if (isEdit) {
            updateProject.mutate(
                {
                    id: project._id,
                    data: form,
                },
                {
                    onSuccess: () => {
                        onClose();
                    },
                }
            );

            return;
        }

        // CREATE MODE
        createProject.mutate(form, {
            onSuccess: () => {
                setForm({
                    title: "",
                    description: "",
                });

                onClose();
            },
        });
    };

    const isPending =
        createProject.isPending ||
        updateProject.isPending;

    const isError =
        createProject.isError ||
        updateProject.isError;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#0f172a] border border-white/10 text-white">

                {/* HEADER */}
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Update Project" : "Create Project"}
                    </DialogTitle>
                </DialogHeader>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 mt-4"
                >
                    {/* TITLE */}
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Project title"
                        className="w-full p-3 bg-[#111827] border border-white/10 rounded-xl text-white"
                        required
                    />

                    {/* DESCRIPTION */}
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full p-3 bg-[#111827] border border-white/10 rounded-xl text-white"
                        rows={3}
                    />

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl bg-white/5 text-white"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-4 py-2 rounded-xl bg-blue-600 text-white"
                        >
                            {isPending
                                ? isEdit
                                    ? "Updating..."
                                    : "Creating..."
                                : isEdit
                                    ? "Update Project"
                                    : "Create Project"}
                        </button>
                    </div>

                    {/* ERROR */}
                    {isError && (
                        <p className="text-red-500 text-sm">
                            Something went wrong
                        </p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
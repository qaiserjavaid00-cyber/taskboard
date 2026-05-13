"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { useCreateProject } from "@/hooks/projects/useProjects";
import { createProjectSchema } from "@/lib/validators/project";
import DatePicker from "../ui/datePicker";

export default function CreateProjectDialog({ children }) {
    const [open, setOpen] = useState(false);
    const createProject = useCreateProject();

    const [form, setForm] = useState({
        title: "",
        description: "",
        dueDate: undefined,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        if (errors[e.target.name]) {
            setErrors((prev) => ({
                ...prev,
                [e.target.name]: "",
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const result = createProjectSchema.safeParse(form);

        if (!result.success) {
            const fieldErrors = {};

            result.error.issues.forEach((err) => {
                fieldErrors[err.path[0]] = err.message;
            });

            setErrors(fieldErrors);
            return;
        }

        setErrors({});

        createProject.mutate(
            {
                ...form,
                dueDate: form.dueDate || undefined,
            },
            {
                onSuccess: () => {
                    setForm({
                        title: "",
                        description: "",
                        dueDate: null,
                    });

                    setOpen(false);
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="bg-[#0f172a] border border-white/10 text-white z-[50]">
                <DialogHeader>
                    <DialogTitle>
                        Create Project
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">

                    {/* TITLE */}
                    <div>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Project title"
                            className="w-full p-3 bg-[#111827] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {errors.title && (
                            <p className="text-red-400 text-sm mt-2">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Description"
                            rows={3}
                            className="w-full p-3 bg-[#111827] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />

                        {errors.description && (
                            <p className="text-red-400 text-sm mt-2">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* DUE DATE */}
                    <div>
                        <DatePicker
                            label="Due Date"
                            value={form.dueDate}
                            onChange={(date) =>
                                setForm((prev) => ({
                                    ...prev,
                                    dueDate: date,
                                }))
                            }
                        />

                        {errors.dueDate && (
                            <p className="text-red-400 text-sm mt-2">
                                {errors.dueDate}
                            </p>
                        )}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={createProject.isPending}
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white disabled:opacity-70"
                        >
                            {createProject.isPending
                                ? "Creating..."
                                : "Create Project"}
                        </button>
                    </div>

                    {/* API ERROR */}
                    {createProject.isError && (
                        <p className="text-red-400 text-sm">
                            {createProject.error?.response?.data
                                ?.message || "Failed to create project"}
                        </p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}


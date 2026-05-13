// "use client";

// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";

// import { useEffect, useState } from "react";
// import {
//     useCreateProject,
//     useUpdateProject,
// } from "@/hooks/projects/useProjects";

// export default function UpdateProjectDialog({
//     isOpen,
//     onClose,
//     mode = "create",
//     project = null,
// }) {
//     const createProject = useCreateProject();
//     const updateProject = useUpdateProject();

//     const isEdit = mode === "edit";

//     const [form, setForm] = useState({
//         title: "",
//         description: "",
//     });

//     // ✅ PREFILL WHEN EDIT OPENS
//     useEffect(() => {
//         if (isEdit && project && isOpen) {
//             setForm({
//                 title: project.title || "",
//                 description: project.description || "",
//             });
//         }
//     }, [isEdit, project, isOpen]);

//     // INPUT CHANGE
//     const handleChange = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value,
//         });
//     };

//     // SUBMIT
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!form.title.trim()) return;

//         // EDIT MODE
//         if (isEdit) {
//             updateProject.mutate(
//                 {
//                     id: project._id,
//                     data: form,
//                 },
//                 {
//                     onSuccess: () => {
//                         onClose();
//                     },
//                 }
//             );

//             return;
//         }

//         // CREATE MODE
//         createProject.mutate(form, {
//             onSuccess: () => {
//                 setForm({
//                     title: "",
//                     description: "",
//                 });

//                 onClose();
//             },
//         });
//     };

//     const isPending =
//         createProject.isPending ||
//         updateProject.isPending;

//     const isError =
//         createProject.isError ||
//         updateProject.isError;

//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogContent className="bg-[#0f172a] border border-white/10 text-white">

//                 {/* HEADER */}
//                 <DialogHeader>
//                     <DialogTitle>
//                         {isEdit ? "Update Project" : "Create Project"}
//                     </DialogTitle>
//                 </DialogHeader>

//                 {/* FORM */}
//                 <form
//                     onSubmit={handleSubmit}
//                     className="space-y-4 mt-4"
//                 >
//                     {/* TITLE */}
//                     <input
//                         name="title"
//                         value={form.title}
//                         onChange={handleChange}
//                         placeholder="Project title"
//                         className="w-full p-3 bg-[#111827] border border-white/10 rounded-xl text-white"
//                         required
//                     />

//                     {/* DESCRIPTION */}
//                     <textarea
//                         name="description"
//                         value={form.description}
//                         onChange={handleChange}
//                         placeholder="Description"
//                         className="w-full p-3 bg-[#111827] border border-white/10 rounded-xl text-white"
//                         rows={3}
//                     />

//                     {/* ACTIONS */}
//                     <div className="flex justify-end gap-3">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="px-4 py-2 rounded-xl bg-white/5 text-white"
//                         >
//                             Cancel
//                         </button>

//                         <button
//                             type="submit"
//                             disabled={isPending}
//                             className="px-4 py-2 rounded-xl bg-blue-600 text-white"
//                         >
//                             {isPending
//                                 ? isEdit
//                                     ? "Updating..."
//                                     : "Creating..."
//                                 : isEdit
//                                     ? "Update Project"
//                                     : "Create Project"}
//                         </button>
//                     </div>

//                     {/* ERROR */}
//                     {isError && (
//                         <p className="text-red-500 text-sm">
//                             Something went wrong
//                         </p>
//                     )}
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// }


"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";

import { useUpdateProject } from "@/hooks/projects/useProjects";

import { updateProjectSchema } from "@/lib/validators/project";

import DatePicker from "../ui/datePicker";

export default function UpdateProjectDialog({
    isOpen,
    onClose,
    project = null,
}) {
    const updateProject = useUpdateProject();

    const [form, setForm] = useState({
        title: "",
        description: "",
        dueDate: undefined,
    });

    const [errors, setErrors] = useState({});

    // PREFILL
    useEffect(() => {
        if (project && isOpen) {
            setForm({
                title: project.title || "",
                description: project.description || "",
                dueDate: project.dueDate
                    ? new Date(project.dueDate)
                    : undefined,
            });
        }
    }, [project, isOpen]);

    // INPUT CHANGE
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        // CLEAR FIELD ERROR
        if (errors[e.target.name]) {
            setErrors((prev) => ({
                ...prev,
                [e.target.name]: "",
            }));
        }
    };

    // SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();

        const result =
            updateProjectSchema.safeParse(form);

        // VALIDATION FAILED
        if (!result.success) {
            const fieldErrors = {};

            result.error.issues.forEach((err) => {
                fieldErrors[err.path[0]] =
                    err.message;
            });

            setErrors(fieldErrors);

            return;
        }

        // CLEAR ERRORS
        setErrors({});

        updateProject.mutate(
            {
                id: project._id,
                data: {
                    ...form,
                    dueDate:
                        form.dueDate || undefined,
                },
            },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#0f172a] border border-white/10 text-white z-[50]">

                {/* HEADER */}
                <DialogHeader>
                    <DialogTitle>
                        Update Project
                    </DialogTitle>
                </DialogHeader>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 mt-4"
                >
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
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                updateProject.isPending
                            }
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white disabled:opacity-70"
                        >
                            {updateProject.isPending
                                ? "Updating..."
                                : "Update Project"}
                        </button>
                    </div>

                    {/* API ERROR */}
                    {updateProject.isError && (
                        <p className="text-red-400 text-sm">
                            {updateProject.error
                                ?.response?.data
                                ?.message ||
                                "Failed to update project"}
                        </p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
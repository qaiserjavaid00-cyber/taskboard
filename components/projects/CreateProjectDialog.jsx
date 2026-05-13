// "use client";

// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";

// import { useState } from "react";
// import { useCreateProject } from "@/hooks/projects/useProjects";

// export default function CreateProjectDialog({ children }) {
//     const [open, setOpen] = useState(false);

//     const createProject = useCreateProject();

//     const [form, setForm] = useState({
//         title: "",
//         description: "",
//     });

//     const handleChange = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!form.title.trim()) return;

//         createProject.mutate(form, {
//             onSuccess: () => {
//                 setForm({
//                     title: "",
//                     description: "",
//                 });

//                 setOpen(false);
//             },
//         });
//     };

//     return (
//         <Dialog open={open} onOpenChange={setOpen}>
//             <DialogTrigger asChild>{children}</DialogTrigger>

//             <DialogContent className="bg-[#0f172a] border border-white/10 text-white">
//                 <DialogHeader>
//                     <DialogTitle>Create Project</DialogTitle>
//                 </DialogHeader>

//                 <form onSubmit={handleSubmit} className="space-y-4 mt-4">

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
//                             onClick={() => setOpen(false)}
//                             className="px-4 py-2 rounded-xl bg-white/5 text-white"
//                         >
//                             Cancel
//                         </button>

//                         <button
//                             type="submit"
//                             disabled={createProject.isPending}
//                             className="px-4 py-2 rounded-xl bg-blue-600 text-white"
//                         >
//                             {createProject.isPending
//                                 ? "Creating..."
//                                 : "Create Project"}
//                         </button>
//                     </div>

//                     {createProject.isError && (
//                         <p className="text-red-500 text-sm">
//                             Failed to create project
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
    DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { useCreateProject } from "@/hooks/projects/useProjects";
import { createProjectSchema } from "@/lib/validators/project";

export default function CreateProjectDialog({ children }) {
    const [open, setOpen] = useState(false);

    const createProject = useCreateProject();

    const [form, setForm] = useState({
        title: "",
        description: "",
    });

    // VALIDATION ERRORS
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        // CLEAR FIELD ERROR WHILE TYPING
        if (errors[e.target.name]) {
            setErrors((prev) => ({
                ...prev,
                [e.target.name]: "",
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const result =
            createProjectSchema.safeParse(form);

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

        createProject.mutate(form, {
            onSuccess: () => {
                setForm({
                    title: "",
                    description: "",
                });

                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="bg-[#0f172a] border border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle>
                        Create Project
                    </DialogTitle>
                </DialogHeader>

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
                            {createProject.error?.response
                                ?.data?.message ||
                                "Failed to create project"}
                        </p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
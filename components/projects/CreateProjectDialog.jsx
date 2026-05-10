// "use client";

// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// import { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// import { useCreateProject } from "@/hooks/projects/useProjects";
// export default function CreateProjectDialog({ children }) {
//     const queryClient = useQueryClient();
//     const [open, setOpen] = useState(false);

//     const createProject = useCreateProject();

//     const [form, setForm] = useState({
//         title: "",
//         description: "",
//     });

//     const mutation = useMutation({
//         mutationFn: createProject,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["projects"] });

//             setForm({
//                 title: "",
//                 description: "",
//             });

//             setOpen(false);
//         },
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

//         mutation.mutate(form);
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
//                             disabled={mutation.isPending}
//                             className="px-4 py-2 rounded-xl bg-blue-600 text-white"
//                         >
//                             {mutation.isPending
//                                 ? "Creating..."
//                                 : "Create Project"}
//                         </button>
//                     </div>

//                     {mutation.isError && (
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

export default function CreateProjectDialog({ children }) {
    const [open, setOpen] = useState(false);

    const createProject = useCreateProject();

    const [form, setForm] = useState({
        title: "",
        description: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.title.trim()) return;

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
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="bg-[#0f172a] border border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">

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
                            onClick={() => setOpen(false)}
                            className="px-4 py-2 rounded-xl bg-white/5 text-white"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={createProject.isPending}
                            className="px-4 py-2 rounded-xl bg-blue-600 text-white"
                        >
                            {createProject.isPending
                                ? "Creating..."
                                : "Create Project"}
                        </button>
                    </div>

                    {createProject.isError && (
                        <p className="text-red-500 text-sm">
                            Failed to create project
                        </p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
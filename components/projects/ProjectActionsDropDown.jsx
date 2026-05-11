"use client";

import Link from "next/link";
import { useState } from "react";
import { MoreVertical, Eye, Pencil, Trash } from "lucide-react";
import UpdateProjectDialog from "./UpdateProjectDialog";
import DeleteConfirmModal from "@/components/ui/deleteConfirmModal";
import { useDeleteProject } from "@/hooks/projects/useProjects";

export default function ProjectActionsDropdown({ project }) {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const deleteProject = useDeleteProject();

    const handleDelete = () => {
        deleteProject.mutate(project._id, {
            onSuccess: () => {
                setDeleteOpen(false);
            },
        });
    };

    return (
        <div className="relative">
            {/* TRIGGER */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen((prev) => !prev);
                }}
                className="text-white/70 hover:text-white"
            >
                <MoreVertical size={20} />
            </button>

            {/* DROPDOWN */}
            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-black/90 border border-white/10 rounded-xl shadow-lg z-50 overflow-hidden">

                    {/* VIEW */}
                    <Link
                        href={`/project/${project._id}`}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 text-sm text-white"
                        onClick={() => setOpen(false)}
                    >
                        <Eye size={16} />
                        View
                    </Link>

                    {/* EDIT */}
                    <button
                        className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 text-sm text-white"
                        onClick={() => {
                            setOpen(false);
                            setEditOpen(true);
                        }}
                    >
                        <Pencil size={16} />
                        Edit
                    </button>

                    {/* DELETE */}
                    <button
                        className="flex items-center gap-2 px-3 py-2 hover:bg-red-500/20 text-sm text-red-400 w-full"
                        onClick={() => {
                            setOpen(false);
                            setDeleteOpen(true);
                        }}
                    >
                        <Trash size={16} />
                        Delete
                    </button>
                </div>
            )}

            {/* EDIT MODAL */}
            <UpdateProjectDialog
                isOpen={editOpen}
                onClose={() => setEditOpen(false)}
                mode="edit"
                project={project}
            />

            {/* DELETE MODAL */}
            <DeleteConfirmModal
                isOpen={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                title="Delete Project"
                description="This action cannot be undone. The project will be permanently deleted."
                loading={deleteProject.isPending}
                onConfirm={handleDelete}
            />
        </div>
    );
}
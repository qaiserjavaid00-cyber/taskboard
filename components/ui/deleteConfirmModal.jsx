"use client";

import { X } from "lucide-react";

export default function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    loading = false,
    title = "Delete item",
    description = "Are you sure you want to delete this?",
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="w-full max-w-md bg-[#0f172a] border border-white/10 rounded-2xl">

                {/* HEADER */}
                <div className="flex justify-between items-center p-5 border-b border-white/10">
                    <h2 className="text-lg font-semibold text-white">
                        {title}
                    </h2>

                    <button onClick={onClose}>
                        <X className="text-slate-400 hover:text-white" />
                    </button>
                </div>

                {/* BODY */}
                <div className="p-5 text-slate-300">
                    {description}
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 p-5 border-t border-white/10">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-white/5"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}
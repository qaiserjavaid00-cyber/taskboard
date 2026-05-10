"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useCreateTask, useUpdateTask } from "@/hooks/tasks/useTasks";

const CreateTaskModal = ({
    isOpen,
    onClose,
    projectId,
    members = [],
    mode = "create",
    task = null,
}) => {
    const createTask = useCreateTask(projectId);
    const updateTask = useUpdateTask(projectId);
    // console.log("TASK IN MODAL:", task);
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        assignees: [],
    });
    // console.log("TASK ASSIGNEES:", task?.assignees);
    // console.log("MEMBERS:", members);

    useEffect(() => {
        if (!task) return;

        const normalizedAssignees = Array.isArray(task.assignees)
            ? task.assignees.map((a) => {
                if (typeof a === "string") return a;

                if (a?._id) return a._id.toString();

                return a.toString();
            })
            : [];

        console.log("NORMALIZED:", normalizedAssignees);

        setForm({
            title: task.title || "",
            description: task.description || "",
            status: task.status || "todo",
            priority: task.priority || "medium",
            assignees: normalizedAssignees,
        });
    }, [task, isOpen]);

    if (!isOpen) return null;

    /* -----------------------------
       INPUT CHANGE
    ------------------------------ */
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    /* -----------------------------
       TOGGLE ASSIGNEES
    ------------------------------ */
    const toggleAssignee = (id) => {
        setForm((prev) => {
            const exists =
                prev.assignees.includes(id);

            return {
                ...prev,
                assignees: exists
                    ? prev.assignees.filter(
                        (x) => x !== id
                    )
                    : [...prev.assignees, id],
            };
        });
    };

    /* -----------------------------
       SUBMIT
    ------------------------------ */

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("👉 UPDATE TASK PAYLOAD:", form);
        if (mode === "edit") {
            updateTask.mutate(
                {
                    taskId: task._id,
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

        createTask.mutate(form, {
            onSuccess: () => {
                setForm({
                    title: "",
                    description: "",
                    status: "todo",
                    priority: "medium",
                    assignees: [],
                });

                onClose();
            },
        });
    };
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-2xl">

                {/* HEADER */}
                <div className="flex justify-between items-center p-5 border-b border-white/10">
                    <h2 className="text-xl font-semibold text-white">
                        {mode === "edit"
                            ? "Edit Task"
                            : "Create Task"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white"
                    >
                        <X />
                    </button>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="p-5 space-y-5"
                >
                    {/* TITLE */}
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Task title"
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

                    {/* STATUS + PRIORITY */}
                    <div className="grid grid-cols-2 gap-3">
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="p-3 bg-[#111827] border border-white/10 rounded-xl text-white"
                        >
                            <option value="todo">
                                Todo
                            </option>
                            <option value="in-progress">
                                In Progress
                            </option>
                            <option value="done">
                                Done
                            </option>
                        </select>

                        <select
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                            className="p-3 bg-[#111827] border border-white/10 rounded-xl text-white"
                        >
                            <option value="low">
                                Low
                            </option>
                            <option value="medium">
                                Medium
                            </option>
                            <option value="high">
                                High
                            </option>
                        </select>
                    </div>

                    {/* ASSIGNEES */}

                    <div>
                        <p className="text-sm text-slate-400 mb-2">
                            Assign Members
                        </p>


                        <div className="space-y-2 max-h-48 overflow-auto">
                            {members.map((m) => {

                                const selected = form.assignees.some(
                                    (id) => id.toString() === (m._id || m.id).toString()
                                );

                                return (
                                    <button
                                        type="button"
                                        key={m._id}
                                        onClick={() =>
                                            toggleAssignee((m._id || m.id).toString())
                                        }
                                        className={`w-full flex justify-between items-center p-3 rounded-xl border ${selected
                                            ? "border-blue-500 bg-blue-500/10"
                                            : "border-white/10 bg-[#111827]"
                                            }`}
                                    >
                                        <span className="text-white">
                                            {m.name}
                                        </span>

                                        <span className="text-xs text-slate-400">
                                            {m.email}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

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
                            className="px-4 py-2 rounded-xl bg-blue-600 text-white"
                            disabled={
                                createTask.isPending || updateTask.isPending
                            }
                        >

                            {mode === "edit"
                                ? updateTask.isPending
                                    ? "Saving..."
                                    : "Save Changes"
                                : createTask.isPending
                                    ? "Creating..."
                                    : "Create Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskModal;
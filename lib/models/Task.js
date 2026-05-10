import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        status: {
            type: String,
            enum: ["todo", "in-progress", "done"],
            default: "todo",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        assignees: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
        dueDate: Date,
    },
    { timestamps: true }
);

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
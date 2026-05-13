// import { z } from "zod";

// export const createProjectSchema = z.object({
//     title: z
//         .string()
//         .trim()
//         .min(3, "Project title must be at least 3 characters")
//         .max(100, "Title too long"),

//     description: z
//         .string()
//         .trim()
//         .max(500, "Description too long")
//         .optional(),

//     dueDate: z
//         .coerce
//         .date()
//         .optional(),

// });

// export const updateProjectSchema =
//     createProjectSchema.partial();



import { z } from "zod";

export const createProjectSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Project title must be at least 3 characters")
        .max(100, "Title too long"),

    description: z
        .string()
        .trim()
        .max(500, "Description too long")
        .optional()
        .or(z.literal("")),

    dueDate: z
        .coerce
        .date()
        .optional()
        .refine((date) => {
            if (!date) return true;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date >= today;
        }, {
            message: "Due date cannot be in the past",
        }),
});

export const updateProjectSchema =
    createProjectSchema.partial();
import { z } from "zod";

export const createProjectSchema = z.object({
    title: z
        .string()
        .trim()
        .min(
            3,
            "Project title must be at least 3 characters"
        )
        .max(100, "Title too long"),

    description: z
        .string()
        .trim()
        .max(500, "Description too long")
        .optional()
        .or(z.literal("")),
});

export const updateProjectSchema =
    createProjectSchema.partial();
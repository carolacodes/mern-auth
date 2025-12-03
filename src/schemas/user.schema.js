import {z} from "zod";

export const updateUserSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long").optional(),
    email: z.string().email("Invalid email address").optional(),
    password: z.string().min(6, "Password must be at least 6 characters long").optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided to update",
});
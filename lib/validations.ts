import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const signupSchema = loginSchema.extend({
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const medicalProfileSchema = z.object({
    bloodType: z.string().optional(),
    allergies: z.string().optional(), // Comma separated for now
    medications: z.string().optional(),
    conditions: z.string().optional(),
    emergencyContactName: z.string().min(1, "Name is required"),
    emergencyContactRelation: z.string().min(1, "Relation is required"),
    emergencyContactPhone: z.string().min(10, "Valid phone number required"),
    height: z.string().optional(),
    weight: z.string().optional(),
});

export const shareTokenSchema = z.object({
    scopes: z.array(z.string()).min(1, "Select at least one data type to share"),
    expiresIn: z.string(), // "15m", "1h", etc.
});

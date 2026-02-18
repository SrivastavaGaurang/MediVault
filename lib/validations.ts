import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
});

export const signupSchema = loginSchema
    .extend({
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
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

// -- New Schemas for Enhanced Records --

export const medicalRecordSchema = z.object({
    // Hospital Details
    hospitalName: z.string().min(1, "Hospital name is required"),
    hospitalLocation: z.string().optional(),

    // Doctor/Staff Details
    doctorName: z.string().min(1, "Doctor name is required"),
    doctorId: z.string().optional(),
    doctorDesignation: z.enum([
        "Senior Consultant",
        "Surgeon",
        "Resident",
        "Junior Dr",
        "Nurse",
        "Other",
    ]),
    doctorSpecialty: z.enum([
        "Cardiology",
        "Gastroenterology",
        "Gynecology",
        "Orthopedics",
        "Neurology",
        "General",
        "Dermatology",
        "Pediatrics",
        "Other",
    ]),
    visitShift: z.enum(["Day", "Night"]),

    // Clinical Details
    diagnosisTitle: z.string().min(1, "Diagnosis title is required"),
    diagnosisDescription: z.string().optional(),
    severity: z.enum(["Low", "Medium", "High", "Critical"]),
    affectedBodyPart: z.string().optional(),

    // Vitals & Metrics
    vitals: z.object({
        bloodPressure: z.string().optional(),
        bloodSugar: z.string().optional(),
        heartRate: z.string().optional(),
        temperature: z.string().optional(),
        spO2: z.string().optional(),
    }),

    // Attachments
    attachments: z.array(z.string()).optional(),

    // Metadata
    date: z.date(),
    type: z.enum(["Visit", "Surgery", "Referral", "Follow-up"]),
});

export const medicalReportSchema = z.object({
    reportType: z.enum([
        "Blood Test",
        "X-Ray",
        "MRI",
        "CT Scan",
        "Urine",
        "Biopsy",
        "Ultrasound",
        "Other",
    ]),
    testName: z.string().min(1, "Test name is required"),
    collectionDate: z.date(),
    collectionTime: z.string().optional(), // HH:MM format
    facilityName: z.string().min(1, "Facility name is required"),
    referredBy: z.string().optional(),
    attachments: z.array(z.string()).min(1, "At least one file is required"),
    summary: z.string().optional(),
});

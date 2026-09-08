import { z } from "zod";
import mongoose from "mongoose";

/* =========================
   COMMON
========================= */

const ObjectIdSchema = z
    .string()
    .refine(
        (value) => mongoose.Types.ObjectId.isValid(value),
        {
            message: "Invalid User ID",
        }
    );

const EmailSchema = z
    .string()
    .trim()
    .email("Invalid email address")
    .toLowerCase();

const PasswordSchema = z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(100, "Password is too long");


/* =========================
   CREATE USER
========================= */

export const CreateUserSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, "Full name must contain at least 2 characters")
        .max(100, "Full name is too long"),

    email: EmailSchema,

    password: PasswordSchema,

    profilePicture: z
        .string()
        .trim()
        .optional(),

    isConsumer: z
        .boolean()
        .default(false)
});


/* =========================
   READ USER
========================= */

export const ReadUserSchema = z.object({
    _id: ObjectIdSchema,

    fullName: z
        .string(),

    email: EmailSchema,

    profilePicture: z
        .string()
        .optional(),

    isDeveloper: z
        .boolean(),

    isAdmin: z
        .boolean(),

    isConsumer: z
        .boolean(),

    createdAt: z
        .date(),

    updatedAt: z
        .date(),
});


/* =========================
   UPDATE USER
========================= */

export const UpdateUserSchema = z
    .object({
        fullName: z
            .string()
            .trim()
            .min(2, "Full name must contain at least 2 characters")
            .max(100)
            .optional(),

        email: EmailSchema
            .optional(),

        password: PasswordSchema
            .optional(),

        profilePicture: z
            .string()
            .trim()
            .optional(),

        isDeveloper: z
            .boolean()
            .optional(),

        isAdmin: z
            .boolean()
            .optional(),

        isConsumer: z
            .boolean()
            .optional(),
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field is required for update",
        }
    );


/* =========================
   TYPES
========================= */

export type CreateUserInput =
    z.infer<typeof CreateUserSchema>;

export type ReadUserOutput =
    z.infer<typeof ReadUserSchema>;

export type UpdateUserInput =
    z.infer<typeof UpdateUserSchema>;
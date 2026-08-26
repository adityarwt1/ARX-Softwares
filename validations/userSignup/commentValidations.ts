import { z } from "zod";
import mongoose from "mongoose";

/* =========================
   OBJECT ID
========================= */

const ObjectIdSchema = z
    .string()
    .refine(
        (value) => mongoose.Types.ObjectId.isValid(value),
        {
            message: "Invalid MongoDB ObjectId",
        }
    );


/* =========================
   CREATE COMMENT
========================= */

export const CreateCommentSchema = z.object({
    productId: ObjectIdSchema,

    consumerName: z
        .string()
        .trim()
        .min(1, "Consumer name is required")
        .max(100, "Consumer name is too long")
        .default("GUEST"),

    comment: z
        .string()
        .trim()
        .min(1, "Comment cannot be empty")
        .max(2000, "Comment cannot exceed 2000 characters"),

    likes: z
        .number()
        .int()
        .min(0)
        .default(0),

    disLikes: z
        .number()
        .int()
        .min(0)
        .default(0),
});


/* =========================
   READ COMMENT
========================= */

export const ReadCommentSchema = CreateCommentSchema.extend({
    _id: ObjectIdSchema,

    createdAt: z.date(),

    updatedAt: z.date(),
});


/* =========================
   UPDATE COMMENT
========================= */

export const UpdateCommentSchema = z
    .object({
        consumerName: z
            .string()
            .trim()
            .min(1)
            .max(100)
            .optional(),

        comment: z
            .string()
            .trim()
            .min(1, "Comment cannot be empty")
            .max(2000, "Comment cannot exceed 2000 characters")
            .optional(),

        likes: z
            .number()
            .int()
            .min(0)
            .optional(),

        disLikes: z
            .number()
            .int()
            .min(0)
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

export type CreateCommentInput =
    z.infer<typeof CreateCommentSchema>;

export type ReadCommentOutput =
    z.infer<typeof ReadCommentSchema>;

export type UpdateCommentInput =
    z.infer<typeof UpdateCommentSchema>;
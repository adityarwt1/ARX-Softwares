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
   CREATE REPLY
========================= */

export const CreateCommentReplySchema = z.object({
    commentId: ObjectIdSchema,

    consumerName: z
        .string()
        .trim()
        .min(1, "Consumer name is required")
        .max(100, "Consumer name is too long")
        .default("GUEST"),

    comment: z
        .string()
        .trim()
        .min(1, "Reply cannot be empty")
        .max(2000, "Reply cannot exceed 2000 characters"),

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
   READ REPLY
========================= */

export const ReadCommentReplySchema =
    CreateCommentReplySchema.extend({
        _id: ObjectIdSchema,

        createdAt: z.date(),

        updatedAt: z.date(),
    });


/* =========================
   UPDATE REPLY
========================= */

export const UpdateCommentReplySchema = z
    .object({
        consumerName: z
            .string()
            .trim()
            .min(1, "Consumer name is required")
            .max(100)
            .optional(),

        comment: z
            .string()
            .trim()
            .min(1, "Reply cannot be empty")
            .max(2000, "Reply cannot exceed 2000 characters")
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

export type CreateCommentReplyInput =
    z.infer<typeof CreateCommentReplySchema>;

export type ReadCommentReplyOutput =
    z.infer<typeof ReadCommentReplySchema>;

export type UpdateCommentReplyInput =
    z.infer<typeof UpdateCommentReplySchema>;
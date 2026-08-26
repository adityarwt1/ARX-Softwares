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
            message: "Invalid Product ID",
        }
    );


/* =========================
   STARS
========================= */

const StarsSchema = z
    .number()
    .int("Stars must be an integer")
    .min(1, "Minimum rating is 1 star")
    .max(5, "Maximum rating is 5 stars");


/* =========================
   CREATE REVIEW
========================= */

export const CreateReviewSchema = z.object({
    productId: ObjectIdSchema,

    stars: StarsSchema,
});


/* =========================
   READ REVIEW
========================= */

export const ReadReviewSchema = CreateReviewSchema.extend({
    _id: ObjectIdSchema,

    createdAt: z.date(),

    updatedAt: z.date(),
});


/* =========================
   UPDATE REVIEW
========================= */

export const UpdateReviewSchema = z.object({
    stars: StarsSchema,
});


/* =========================
   TYPES
========================= */

export type CreateReviewInput =
    z.infer<typeof CreateReviewSchema>;

export type ReadReviewOutput =
    z.infer<typeof ReadReviewSchema>;

export type UpdateReviewInput =
    z.infer<typeof UpdateReviewSchema>;
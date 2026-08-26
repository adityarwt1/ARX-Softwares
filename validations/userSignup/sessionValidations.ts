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
            message: "Invalid User ID",
        }
    );


/* =========================
   EXPIRATION
========================= */

const ExpSchema = z.union([
    z.coerce.date(),

    z
        .number()
        .int()
        .positive("Expiration timestamp must be positive"),
]);


/* =========================
   CREATE SESSION
========================= */

export const CreateSessionSchema = z.object({
    userId: ObjectIdSchema,

    exp: ExpSchema,

    isAdmin: z
        .boolean()
        .optional(),

    isDeveloper: z
        .boolean()
        .optional(),

    isConsumer: z
        .boolean()
        .optional(),
});


/* =========================
   READ SESSION
========================= */

export const ReadSessionSchema = CreateSessionSchema.extend({
    _id: ObjectIdSchema,

    createdAt: z.date(),

    updatedAt: z.date(),
});


/* =========================
   UPDATE SESSION
========================= */

export const UpdateSessionSchema = z
    .object({
        exp: ExpSchema.optional(),

        isAdmin: z
            .boolean()
            .optional(),

        isDeveloper: z
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

export type CreateSessionInput =
    z.infer<typeof CreateSessionSchema>;

export type ReadSessionOutput =
    z.infer<typeof ReadSessionSchema>;

export type UpdateSessionInput =
    z.infer<typeof UpdateSessionSchema>;
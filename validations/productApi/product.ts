import mongoose from "mongoose";
import { z } from "zod";

const ProductDescriptionSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Description title is required")
        .max(200, "Description title is too long"),

    content: z
        .string()
        .trim()
        .min(1, "Description content is required"),
});

const ProductTypeSchema = z.literal("EDTECH");

const ProductFilterSchema = z.enum([
    "WEBSITE",
    "APP",
    "NPMPACKAGE",
]);

const ProductStatusSchema = z.enum([
    "Live",
    "Under Development",
    "Maintenance",
]);

const OptionalUrlSchema = z
    .string()
    .trim()
    .url("Invalid URL")
    .optional();

const ObjectIdSchema = z
    .string()
    .refine(
        (value) => mongoose.Types.ObjectId.isValid(value),
        {
            message: "Invalid Product ID",
        }
    );

export const CreateProductSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Product title is required")
        .max(200, "Product title is too long"),

    descriptions: z
        .array(ProductDescriptionSchema)
        .min(1, "At least one description is required"),

    banner: z
        .string()
        .trim()
        .min(1, "Banner is required"),

    productImages: z
        .array(
            z
                .string()
                .trim()
                .min(1, "Invalid product image")
        )
        .default([]),

    type: ProductTypeSchema.default("EDTECH"),

    filter: ProductFilterSchema,

    status: ProductStatusSchema.default("Under Development"),

    websiteUrl: OptionalUrlSchema,

    playstoreUrl: OptionalUrlSchema,

    appStoreUrl: OptionalUrlSchema,

    npmPackageUrl: OptionalUrlSchema,

    gitHubUrl: z
        .string()
        .trim()
        .url("Invalid GitHub URL"),

    liveDate: z.coerce.date(),
});

export const ReadProductSchema = CreateProductSchema.extend({
    _id: ObjectIdSchema,

    forwards: z
        .number()
        .int()
        .min(0, "Forwards cannot be negative"),

    currentProductVisitors: z
        .number()
        .int()
        .min(0, "Current product visitors cannot be negative"),

    createdAt: z.date(),

    updatedAt: z.date(),
});

export const UpdateProductSchema = z
    .object({
        title: z
            .string()
            .trim()
            .min(1, "Product title is required")
            .max(200, "Product title is too long")
            .optional(),

        descriptions: z
            .array(ProductDescriptionSchema)
            .min(1, "At least one description is required")
            .optional(),

        banner: z
            .string()
            .trim()
            .min(1, "Banner is required")
            .optional(),

        productImages: z
            .array(
                z
                    .string()
                    .trim()
                    .min(1, "Invalid product image")
            )
            .optional(),

        type: ProductTypeSchema.optional(),

        filter: ProductFilterSchema.optional(),

        status: ProductStatusSchema.optional(),

        websiteUrl: OptionalUrlSchema,

        playstoreUrl: OptionalUrlSchema,

        appStoreUrl: OptionalUrlSchema,

        npmPackageUrl: OptionalUrlSchema,

        gitHubUrl: z
            .string()
            .trim()
            .url("Invalid GitHub URL")
            .optional(),

        liveDate: z.coerce.date().optional(),
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field is required for update",
        }
    );

export const DeleteProductSchema = z.object({
    _id: ObjectIdSchema,
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type ReadProductOutput = z.infer<typeof ReadProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
export type DeleteProductInput = z.infer<typeof DeleteProductSchema>;


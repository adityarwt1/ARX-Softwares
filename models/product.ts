import mongoose, { Schema } from "mongoose";

interface ProductDescription {
    title: string;
    content: string;
}

export interface ProductInterface {
    title: string;

    descriptions: ProductDescription[];

    banner: string;

    productImages: string[];

    type: "EDTECH";

    filter: "WEBSITE" | "APP" | "NPMPACKAGE";

    status: "Live" | "Under Development" | "Maintenance";

    websiteUrl?: string;

    playstoreUrl?: string;

    appStoreUrl?: string;

    npmPackageUrl?: string;

    forwards: number;

    gitHubUrl: string;

    liveDate: Date;

    currentProductVisitors: number;
}

const ProductDescriptionSchema = new Schema<ProductDescription>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false }
);

const ProductSchema = new Schema<ProductInterface>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        descriptions: {
            type: [ProductDescriptionSchema],
            required: true,
            default: [],
        },

        banner: {
            type: String,
            required: true,
            trim: true,
        },

        productImages: {
            type: [String],
            required: true,
            default: [],
        },

        type: {
            type: String,
            enum: ["EDTECH"],
            required: true,
            default: "EDTECH",
        },

        filter: {
            type: String,
            enum: ["WEBSITE", "APP", "NPMPACKAGE"],
            required: true,
        },

        status: {
            type: String,
            enum: ["Live", "Under Development", "Maintenance"],
            required: true,
            default: "Under Development",
        },

        websiteUrl: {
            type: String,
            trim: true,
        },

        playstoreUrl: {
            type: String,
            trim: true,
        },

        appStoreUrl: {
            type: String,
            trim: true,
        },

        npmPackageUrl: {
            type: String,
            trim: true,
        },

        forwards: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },

        gitHubUrl: {
            type: String,
            required: true,
            trim: true,
        },

        liveDate: {
            type: Date,
            required: true,
        },

        currentProductVisitors: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const Product =
    mongoose.models.Product ||
    mongoose.model<ProductInterface>("Product", ProductSchema);
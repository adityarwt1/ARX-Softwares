import mongoose, { Schema } from "mongoose";

export interface CommentInterface {
    productId: mongoose.Types.ObjectId;
    consumerName: string;
    comment: string;
    likes: number;
    disLikes: number;
    createdAt?: Date;
    updated?: Date;
}

const CommentSchema = new Schema<CommentInterface>(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        consumerName: {
            type: String,
            required: true,
            default: "GUEST",
            trim: true,
        },

        comment: {
            type: String,
            required: true,
            trim: true,
        },

        likes: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },

        disLikes: {
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

export const CommentModel =
    mongoose.models.Comment ||
    mongoose.model<CommentInterface>("Comment", CommentSchema);
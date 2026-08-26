import mongoose, { Schema } from "mongoose";

export interface ReviewInterface {
    productId: mongoose.Types.ObjectId;
    stars: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const ReviewSchema = new Schema<ReviewInterface>(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
            index: true,
        },

        stars: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
    },
    {
        timestamps: true,
    }
);

export const ReviewModel =
    mongoose.models.Review ||
    mongoose.model<ReviewInterface>("Review", ReviewSchema);
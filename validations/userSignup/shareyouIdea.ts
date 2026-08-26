import mongoose, { Schema } from "mongoose";

export interface ShareYourIdeaInterface {
    consumerName: string;
    title?: string;
    idea: string;
    images?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

const ShareYourIdeaSchema = new Schema<ShareYourIdeaInterface>(
    {
        consumerName: {
            type: String,
            required: true,
            trim: true,
        },

        title: {
            type: String,
            required: false,
            trim: true,
        },

        idea: {
            type: String,
            required: true,
            trim: true,
        },

        images: {
            type: [String],
            required: false,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const ShareYourIdea =
    mongoose.models.ShareYourIdea ||
    mongoose.model<ShareYourIdeaInterface>(
        "ShareYourIdea",
        ShareYourIdeaSchema
    );

export default ShareYourIdea;
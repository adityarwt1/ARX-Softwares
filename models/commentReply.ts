import mongoose, { Schema } from "mongoose";

export interface CommentReplyInterface {
    commentId: mongoose.Types.ObjectId;
    consumerName: string;
    comment: string;
    likes: number;
    disLikes: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const CommentReplySchema = new Schema<CommentReplyInterface>(
    {
        commentId: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            required: true,
            index: true,
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

export const CommentReplyModel =
    mongoose.models.CommentReply ||
    mongoose.model<CommentReplyInterface>(
        "CommentReply",
        CommentReplySchema
    );
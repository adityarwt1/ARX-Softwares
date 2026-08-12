import mongoose from "mongoose";

export interface Visitors {
    visits: number;
    ipAddress: string[];
}

const VisitorsSchema: mongoose.Schema<Visitors> = new mongoose.Schema(
    {
        visits: {
            type: Number,
            default: 0,
            required: false,
        },
        ipAddress: [
            {
                type: String,
                required: false,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Visitors =
    mongoose.models.Visitors ||
    mongoose.model<Visitors>("Visitors", VisitorsSchema);

export default Visitors;
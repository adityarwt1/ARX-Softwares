import mongoose, { Schema } from "mongoose";

export enum MonthsThreeWordForm {
    JAN = "JANUARY",
    FEB = "FEBRUARY",
    MAR = "MARCH",
    APR = "APRIL",
    MAY = "MAY",
    JUN = "JUNE",
    JUL = "JULY",
    AUG = "AUGUST",
    SEP = "SEPTEMBER",
    OCT = "OCTOBER",
    NOV = "NOVEMBER",
    DEC = "DECEMBER",
}

export const MonthsNumberToThreeWord = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
] as const;

export interface Days {
    date: number;
    visitios: number;
}

export interface Month {
    month: MonthsThreeWordForm;
    days: Days[];
}

export interface YearBasedVisitors {
    year: number;
    months: Month[];
}

const DaysSchema = new Schema<Days>(
    {
        date: {
            type: Number,
            required: true,
        },
        visitios: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { _id: false }
);

const MonthSchema = new Schema<Month>(
    {
        month: {
            type: String,
            enum: Object.values(MonthsThreeWordForm),
            required: true,
        },
        days: {
            type: [DaysSchema],
            default: [],
        },
    },
    { _id: false }
);

const YearBasedVisitorsSchema = new Schema<YearBasedVisitors>(
    {
        year: {
            type: Number,
            required: true,
            index:true
        },

        months: {
            type: [MonthSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);
const Visitors = mongoose.models.Visitors || mongoose.model<YearBasedVisitors>("Visitors", YearBasedVisitorsSchema)
export default Visitors
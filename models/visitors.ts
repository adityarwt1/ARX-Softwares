import mongoose from "mongoose";
export enum MonthsThreeWordForm {
    "JAN" = "JANUARY",
    "FEB" = "FEBRUARY",
    "MAR" = "MARCH",
    "APR" = "APRIL",
    "MAY" = "MAY", 
    "JUN" = "JUNE", 
    "JUL" = "JULY",
    "AUG" = "AUGUST", 
    "SEP" = "SEPTEMBER", 
    "OCT" = "OCTOBER",
    "NOV" = "NOVEMBER", 
    "DEC" = "DECEMBER"
}
export interface Days{
    date:number,
    visitios:number
}
export interface Month {
    month:MonthsThreeWordForm,
    days:Days[]
}
export interface YearBasedVisitors {
    year:number,
    months:Month[]
}

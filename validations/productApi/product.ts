import { zodErrors } from "@/constants/zodValidationsError/zodErrors"
import z from "zod"

export const productFilterValidations = z.object({
    featured:z.boolean({error:"Featured" + zodErrors.stringValueError}).optional(),
    limit:z.number({error:"Limit" + zodErrors.nuemaricalValueError}).optional(),
    page:z.number({error: "Page" + zodErrors.nuemaricalValueError}).optional()
})


export const productCreateValidations = z.object({
    title:z.string({error:"Title" + zodErrors.stringValueError}).nonempty({error:"Title Must Be provided"}),
    description: z.string({error:"Descritption" + zodErrors.stringValueError}).nonempty({error:"Descritption Must be Provided "}).min(20,{error:"Description Length must be atleast 20 words!"}),
    url:z.string({error:"URL" + zodErrors.stringValueError}).optional(),
    featured:z.boolean({error:"Featured"+ zodErrors.booleanValueError}).optional(),
    badges:z
    .array(z.string({error:"Badges" + zodErrors.stringValueError}))
    .nonempty({error:"Badges Are Non Empty!"})
})
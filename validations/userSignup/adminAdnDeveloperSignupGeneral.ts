import z from 'zod'

export const createUserValidations = z.object({
    firstName:z.string({error:"Firstname Must be provided as the string!"}).length(3, {error:"First name must be more than 3 character!"}).nonempty({error:"Firstanem must be not emptpty!"}),
    lastName:z.string({error:"Lastname must be the string"}).nonempty().optional(),
    email:z.email({error:"email must be provided as string!"}).nonempty({error:"Email must be provided!"}),
    password:z.string({error:"Password must be provided as string!"}).nonempty({error:"Password must be provided!"}).min(6,{error:"Password more tha 6 characters!"}),
    profilePicture:z.string({error:"Profile micture provided as based64 string!"}).optional(),
    isAdmin:z.boolean({error:"Admin provided as the boolean value!"}).optional(), 
    isDeveloper:z.boolean({error:"Developer property provided boolean value!"}).optional()
})
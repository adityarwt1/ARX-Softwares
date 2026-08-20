export interface JWT_TOKEN_INTERFACE {
    sessionId:string
    exp?:number,
    iat?:number
}

export interface AdminAndDeveloper {
    isAdmin:boolean,
    userId:string,
    email:string, 
}
export interface HTTP_Response<T> {
    success:boolean,
    success_message?:string
    data?:T,
    error?:{
        message:string,
        status_code:number
    }
}
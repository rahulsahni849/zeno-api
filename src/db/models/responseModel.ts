interface IResponseModel{
    status:number,
    data?:any,
    error?:any,
    message:string
}


export function ErrorGenerator(stat:number,error:any,message:string):IResponseModel{
    let errorObj:IResponseModel = {
        status:stat,
        error:error,
        message:message
    }
    return errorObj
}

export function ResultGenerator(stat:number,data:any,message:string):IResponseModel{
    let respObj:IResponseModel= {
        status:stat,
        data:data,
        message:message
    }

    return respObj
}
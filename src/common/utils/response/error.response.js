
// import { NODE_ENV } from '../../../../../config/config.service.js';
import { NODE_ENV } from './../../../../config/config.service.js';
export const ErrorResponse = ({message = "Error" , status = 400 ,extra =undefined}={}) =>{
throw new Error(message,{status,extra})
}
export const RadRequestException = ({message = "RadRequestException"   ,extra =undefined}={}) =>{
return ErrorResponse({message,status:400,extra})
}
export const ConflictException = ({message = "ConflictException"   ,extra =undefined}={}) =>{
return ErrorResponse({message,status:409,extra})
}
export const UnauthorizedException = ({message = "UnauthorizedException"   ,extra =undefined}={}) =>{
return ErrorResponse({message,status:401,extra})
}
export const NorFoundException = ({message = "NorFoundException"   ,extra =undefined}={}) =>{
return ErrorResponse({message,status:404,extra})
}
export const ForbiddenException = ({message = "ForbiddenException"   ,extra =undefined}={}) =>{
return ErrorResponse({message,status:403,extra})
}
 


//fixed error structure

export const globalErrorHandling = (error,req,res,next) => {
    const status = error.cause?.status ?? 500;
    const mood = NODE_ENV =="production"
    const defaultErrorMessage = 'something went worng server error';
    const displayErrorMessage= error.message || defaultErrorMessage;
    return res.status(status).json({
        status,
        stack : mood? undefined : error.stack,
        errorMessage:mood? status==500? defaultErrorMessage: displayErrorMessage : displayErrorMessage
    })
}
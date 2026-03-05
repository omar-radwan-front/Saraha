import { TokenTypeEnum } from "../common/enums/security.enum.js";
import { decodeToken, ForbiddenException, RadRequestException } from "../common/utils/index.js";



export const authentication = (tokenType = TokenTypeEnum.access) =>{


    return async(req , res , next ) =>{
  
if(!req.headers.authorization){
    throw RadRequestException({message: "missing authorization key "})
}
    const {authorization}= req.headers;
console.log({authorization});   
const [flag , credential]= authorization.split(" ")
console.log({flag , credential});
 if(!flag || !credential){
    throw RadRequestException({message: "missing authorization port "})
 }
 switch (flag) {
    case 'Basic':
        const data =Buffer.from(credential , 'base64').toString()
        const [username , password ] = data.split(":")
        console.log({username , password});
        
        break;
        case 'Bearer' : 

        req.user = await decodeToken({token : credential , tokenType})
        const x =req.user
        console.log({x});
        
 
    default:
        break;
 }
        next()
    }

}



export const authorization = ( accessRoles = [],tokenType = TokenTypeEnum.access) =>{


    return async(req , res , next ) =>{
        
// if(!req.headers.authorization){
//     throw RadRequestException({message: "missing authorization key "})
// }
//         req.user = await decodeToken({token : req.headers.authorization , tokenType})
    
// console.log(req.user.role);
const test = req.user
console.log({test});

if(!accessRoles.includes(req.user.role)){
     throw ForbiddenException({message: " not allowed account "})
}

next()
    }

}
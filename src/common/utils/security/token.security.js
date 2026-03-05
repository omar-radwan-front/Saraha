import  jwt  from 'jsonwebtoken';
import { USER_REFRESH_TOKEN_SECRET_KEY, USER_TOKEN_SECRET_KEY } from '../../../../config/config.service.js';
import { AudienceEnum, TokenTypeEnum } from '../../enums/security.enum.js';
import { RoleEnum } from '../../enums/user.enum.js';
import { RadRequestException, UnauthorizedException } from '../response/error.response.js';
import { findOne } from '../../../DB/database.repository.js';
import { userModel } from '../../../DB/index.js';
 

export const generateToken = async({
    payload = {},
    secreat = USER_TOKEN_SECRET_KEY ,
    Options ={}
} = {})=>{
    return jwt.sign(payload,secreat,Options)
}
export const verifyToken = async({
    token,
    secreat = USER_TOKEN_SECRET_KEY ,
    
} = {})=>{
    return jwt.verify(token,secreat)
}

export const getTokenSignature = async(role) => {
    let accessSignature = undefined;
    let refreshSignature = undefined;
    let audience = AudienceEnum.User
    // let refreshAudience = 
    switch (role) {
      case  RoleEnum.Admin:
        accessSignature = ADMIN_TOKEN_SECRET_KEY
        refreshSignature=ADMIN_REFRESH_TOKEN_SECRET_KEY
        audience =AudienceEnum.Admin
        // refreshAudience='Refresh_admin'
        break;
    
      default:
         accessSignature = USER_TOKEN_SECRET_KEY
        refreshSignature=USER_REFRESH_TOKEN_SECRET_KEY
        audience =AudienceEnum.User
        // refreshAudience='Refresh_user'
        break;
    }
    return {accessSignature,refreshSignature,audience}
    
    // const access_token = jwt.sign({sub : user._id },
    //   signature ,
    //   {
    //     issuer,
    //     audience,
    //     expiresIn:30
    //   }
    // )

}
 
export const getSignatureLevel = async(audienceType) => {
    let signatureLevel ;
    switch (audienceType) {
        case AudienceEnum.Admin:
            signatureLevel=RoleEnum.Admin
            break;
    
        default:
            signatureLevel=RoleEnum.User
            break;
    }
    return signatureLevel;
}
export const creatLoginCredentials =async(user, issuer) => {
    const {accessSignature,refreshSignature,audience}= await getTokenSignature(user.role)
 
const access_token = await generateToken({
  payload:{sub : user._id },
  secreat:accessSignature,
  Options:{
    issuer,
    audience : [TokenTypeEnum.access,audience],
    expiresIn :1800
  }
  
  
  })
//////////////////////////////////////
const refresh_token = await generateToken({
  payload : {sub : user._id},
  secreat : refreshSignature,
   Options:{
    issuer,
    audience : [TokenTypeEnum.refresh,audience],
    expiresIn :'1y'
  }
})
   

  return {access_token,refresh_token}
}


export const decodeToken = async( {token , tokenType = TokenTypeEnum.access} = {} )=> {

    const decode = jwt.decode(token)
    console.log(decode);

    if(!decode?.aud?.length){
        throw RadRequestException({message:"file to decoded this token "})
    }
    const [decodeTokenType,audienceType] = decode.aud;
    if(decodeTokenType !== tokenType)
                throw RadRequestException({message:`invalid token type token of type ${decodeTokenType}
             cannot access this api while we expected token of type ${tokenType}`  })

    const signatureLevel = await getSignatureLevel(audienceType)
     console.log({signatureLevel});

     const {accessSignature,refreshSignature} = await getTokenSignature(signatureLevel)
     console.log({accessSignature,refreshSignature});

     const verifyData = await verifyToken({
        token,
        secreat:tokenType == TokenTypeEnum.refresh? refreshSignature : accessSignature
     })
      console.log({verifyData});
      
     const user = await findOne({
        model :userModel,
        filter:{_id : verifyData.sub}
     })
     console.log({user});
     
     if(!user){
        throw UnauthorizedException({message : "not REgister account "})
     }

     return user
     
}


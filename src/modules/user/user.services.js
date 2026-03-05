
import  jwt  from 'jsonwebtoken';
import { ADMIN_REFRESH_TOKEN_SECRET_KEY, ADMIN_TOKEN_SECRET_KEY, USER_REFRESH_TOKEN_SECRET_KEY, USER_TOKEN_SECRET_KEY } from '../../../config/config.service.js';
import { creatLoginCredentials, decodeToken } from '../../common/utils/index.js';
import { TokenTypeEnum } from '../../common/enums/security.enum.js';

export const profile = async (user) => {
console.log(user);
// const user = await decodeToken({token:authorization })
 
return user

}

/////////////////
export const rotateToken = async (user , issuer) => {
console.log(user);

 
// const user = await decodeToken({token:authorization ,tokenType : TokenTypeEnum.refresh })
 
return await creatLoginCredentials(user , issuer)

}
// import { userModel } from "../../DB/model/user.model.js";

import { create, findOne, userModel } from "../../DB/index.js";
import {hash,compare,genSalt } from 'bcrypt'
import { ADMIN_REFRESH_TOKEN_SECRET_KEY, ADMIN_TOKEN_SECRET_KEY ,SALT_ROUND,USER_REFRESH_TOKEN_SECRET_KEY,USER_TOKEN_SECRET_KEY } from './../../../config/config.service.js';
import { ConflictException, creatLoginCredentials, decrypt, encrypt, generateToken, getTokenSignature, NorFoundException } from "../../common/utils/index.js";
 import jwt from 'jsonwebtoken'
import { RoleEnum } from "../../common/enums/user.enum.js";
import { TokenTypeEnum } from "../../common/enums/security.enum.js";
  

export const signup =async (inputs) => {

    const{username,password, email ,phone}=inputs;

  // const checkUserExist = await userModel.findOne({email});
  const checkUserExist =await findOne({
    filter : {email},
    model : userModel

  })

  if (checkUserExist) {
    // throw new Error("Email exist ", {cause: {status: 409 }})
    throw ConflictException({message : "Email exist"})
  }

  // const [user] = await userModel.create({username,email,password,phone});
  const user = await create({
    data : {
      username,
      email,
      password :await hash(password,SALT_ROUND),
      phone :await encrypt(phone)
    },
    model : userModel
  })
  return user 
}
/////////////////////////////////////
export const login =async (inputs ,issuer) => {

    const{ password, email }=inputs;

  // const user = await userModel.findOne({email , password});
  const user = await findOne({
    filter : {email},
    model : userModel,
    options : {
      lean : true
    }
  })

  if (!user) {
     throw new Error("Email not found ", {cause:{status: 404 }})
  }
  const match = await compare(password, user.password)
  if(!match){
 throw NorFoundException({message:"NotFound"})}
// user.phone = await decrypt(user.phone)


console.log(user.role);      /// storage db

 return await creatLoginCredentials(user,issuer)
}
// import { userModel } from "../../DB/model/user.model.js";

import { create, findOne, userModel } from "../../DB/index.js";
import {hash,compare,genSalt } from 'bcrypt'
import { SALT_ROUND } from './../../../config/config.service.js';
import { ConflictException, decrypt, encrypt, NorFoundException } from "../../common/utils/index.js";
 
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
export const login =async (inputs) => {

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
//  throw new Error("Email not match ", {cause:{status: 404 }})  }
throw NorFoundException({message:"NotFound"})}
user.phone = await decrypt(user.phone)
  return {user,match}
}
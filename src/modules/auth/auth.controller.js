import {Router} from 'express'
import { login, signup } from './auth.services.js';
import { successResponse } from '../../common/utils/index.js';
 const router =Router();
  

router.post("/signup" , async(req ,res ,next) => {
const result = await signup(req.body)
// return res.status(201).json({message : "Done signup" , result})
return successResponse({res,message:"Done signup"  , status:201,data: {result}})

})


router.post("/login" , async(req ,res ,next) => {
const result = await login(req.body)
// return res.status(200).json({message : "Done login " , result})
return successResponse({res,message: "Done Login " ,data: {result}})
})

export default router ;
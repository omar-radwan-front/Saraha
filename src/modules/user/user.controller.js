import {Router} from 'express'
import { successResponse } from '../../common/utils/index.js'
import { profile, rotateToken } from './user.services.js'
import { authentication, authorization } from '../../middleware/index.js'
import { TokenTypeEnum } from '../../common/enums/security.enum.js'
import { endpoint } from './user.authorization.js'


const router = Router()

router.get("/", authentication(),authorization(endpoint.profile) ,async(req ,res ,next ) => {
const account = await profile(req.user)

return successResponse({res,message: 'Done profile', status:200 , data:{account}})

})
/////
router.get("/rotate",authentication(TokenTypeEnum.refresh),async(req ,res ,next )=> {
const account = await rotateToken(req.user ,`${req.protocol}://${req.host}`)

return successResponse({res,message: 'Done rotateToken', status:201 , data:{account}})

})
export default router

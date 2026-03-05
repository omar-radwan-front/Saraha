 
import { resolve } from 'node:path'
import { config } from 'dotenv'

// حدد default
 export const NODE_ENV = process.env.NODE_ENV

const envPath = {
  development: `.env.development`,
  production: `.env.production`,
}
console.log({env:envPath[NODE_ENV]});

// حمل الملف
config({ path: resolve(`./config/${envPath[NODE_ENV]}`)})

 
export const port = process.env.PORT ?? 7000
export const DB_URI = process.env.DB_URI
export const ENC_BYTE=process.env.ENC_BYTE
// export const USER_TOKEN_SECRET_KEY=process.env.USER_TOKEN_SECRET_KEY
export const USER_TOKEN_SECRET_KEY = process.env.USER_TOKEN_SECRET_KEY
export const USER_REFRESH_TOKEN_SECRET_KEY  = process.env.USER_REFRESH_TOKEN_SECRET_KEY 
export const ADMIN_TOKEN_SECRET_KEY  = process.env.ADMIN_TOKEN_SECRET_KEY 
export const ADMIN_REFRESH_TOKEN_SECRET_KEY  = process.env.ADMIN_REFRESH_TOKEN_SECRET_KEY 

export const SALT_ROUND = parseInt(process.env.SALT_ROUND ?? '10')

console.log({ DB_URI })
 
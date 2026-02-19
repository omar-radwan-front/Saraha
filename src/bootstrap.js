// import {   NODE_ENV ,port } from '../config/config.service.js'
import express from 'express'
import { authRouter } from './modules/index.js';
import { connectDB } from './DB/connection.js';

// import { connectDB } from './DB/connection';
// import { NODE_ENV } from './../config/config.service.js';
import { globalErrorHandling } from './common/utils/index.js';
 


async function bootstrap (){
const app = express()
const port = 3000 ;

//DB
  await connectDB()
// convert buffer 
app.use(express.json());


//welcome 
app.get('/', (req , res , next ) => {

     return res.send("Hello world ")
} ) 


// app . routing 
app.use("/auth" , authRouter)


//invalid app routing method ,url 

app.all ('{/*dummy}' , (req ,res ,next ) => {
    return res.status(404).json({message : "invalid application "})
})

//error Handling
app.use(globalErrorHandling)

app.listen(port , ()=> console.log (` app listen on port ${port}`)   )
}
export default bootstrap 
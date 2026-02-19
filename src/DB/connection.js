// import {MongoClient } from 'mongodb'
//  const client = new MongoClient("mongodb+srv://OmarRayan:12345omar@cluster0.r8yzpgi.mongodb.net/")

//  export const connectDB =async ()=>{
//     try {
//         await client.connect()
//         console.log('db connect successfly 👨‍💻');
        
//     } catch (error) {
//                 console.log('db not  connect successfly 👨');

//     }
//  }

//  export const db = client.db('Blog_App')


//////////////////////////////////////////////////////////////////////

import mongoose from "mongoose";
import { DB_URI } from "../../config/config.service.js";
import { userModel } from "./model/user.model.js";

export const connectDB = async () => {
try {
    await mongoose.connect(DB_URI,{serverSelectionTimeoutMS:30000});
    console.log(`DB connected successfully 🖐️`);
     await userModel.syncIndexes()
    
} catch (error) {
    console.log(`fail to connect on DB ${error}`);
    
}




}
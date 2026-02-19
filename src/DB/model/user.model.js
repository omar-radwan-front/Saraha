// import { db } from "../connection";

//  export const userModel = db.createCollection('Users')

import mongoose from 'mongoose'
 import { GenderEnum, ProviderEnum } from '../../common/enums/index.js';



const userSchema = new mongoose.Schema({
    firstName :{
        type : String ,
        required : true ,
        minLength :[2,'firstName cannot be less than 2 char but have entered a {value}'],
        maxLength : 25,
        trim : true 
    },
    lastName :{
        type : String ,
        required : true ,
        minLength :[2,'lastName cannot be less than 2 char but have entered a {value}'],
        maxLength : 25,
        trim : true 
    },
    email :{
        type : String ,
        required : true ,
        unique : true 
    },
    password :{
        type : String ,
        required : true ,
    },
    phone :{
        type : String ,
        // required : true ,
    },
    confirmEmail :{
        type : Date ,
     },
    gender :{
        type : Number ,
        enum : Object.values(GenderEnum),
        default : GenderEnum.male
     },
    provider :{
        type : Number ,
        enum : Object.values(ProviderEnum),
        default : ProviderEnum.system
     },
     profilePicture : String,
     coverProfilePicture : [String],
     changeCredentialsTime: Date,
},{
    strict : true ,
    collection : "Saraha_Users",
    timestamps : true ,
    strictQuery : true ,
    optimisticConcurrency : true ,
    autoIndex : true ,
    toJSON : {virtuals : true},
    toObject : {virtuals : true},

});

userSchema.virtual("username").set(function(value){
    const[firstName,lastName]=value?.split(' ') || [];

    this.set({ firstName , lastName })
}).get(function(){
    return this.firstName + " " + this.lastName;
})


export const userModel = mongoose.models.users || mongoose.model("users",userSchema)


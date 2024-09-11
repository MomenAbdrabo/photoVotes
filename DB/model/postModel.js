import mongoose, { Schema,  model } from "mongoose";


const postSchema= new Schema({

    userID:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },
    image:{
        type:Object,
        required:true,
    },
    title:String,
    caption:String,
    like:[{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }],
    UnLike:[{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }],
    isDeleted:{
        type:Boolean,
        default:false
    }




},{
    timestamps:true
})




export const postModel=mongoose.models.Post || model('Post',postSchema)
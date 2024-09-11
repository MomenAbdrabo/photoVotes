
import mongoose, { Schema,  Types,  model } from "mongoose";


const commentSchema= new Schema({

    userID:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },
    postID:{
        type:mongoose.Types.ObjectId,
        ref:'Post',
        required:true,
    },
    image:{
        type:Object,
       
    },
    text:{
        type:String,
        required:true
    },
    like:[{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }],
    UnLike:[{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }],
    reply:[{type:Types.ObjectId,ref:'Comment'}],
    commentType:{
        type:String,
        default:'comment',
        enum:['comment','reply']
    },
    isDeleted:{
        type:Boolean,
        default:false
    }




},{
    timestamps:true
})




export const CommentModel=mongoose.models.Comment || model('Comment',commentSchema)
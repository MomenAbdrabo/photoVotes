import {  Types } from "mongoose";

import { postModel } from "../../../../DB/model/postModel.js";
import Cloudinary from "../../../utils/Cloudinary.js";
import { CommentModel } from "../../../../DB/model/commentModel.js";




export const showPost=async(req,res,next)=>{
// {userID:req.user.id}\
const{page_Number,numbarsOfPosts}=req.query

const cursor= postModel.find({}).skip((page_Number-1)*5).limit(numbarsOfPosts).populate([
        {
        path:"userID",
        select:"userName profilePic"
    },
    //     {
    //     path:"like",
    //     select:"userName "
    // },
    //     {
    //     path:"UnLike",
    //     select:"userName "
    // }
]).cursor()
const posts=[]
    for(let doc=await cursor.next();doc!=null;doc=await cursor.next()){
        const comment=await CommentModel.find({postID:doc._id ,commentType:'comment'}).populate([
            
            {
            path:'reply',
            // populate:[ {
            //     path:"userID",
            //     select:"userName profilePic"
            // },
            //     {
            //     path:"like",
            //     select:"userName "
            // },
            //     {
            //     path:"UnLike",
            //     select:"userName "
            // }]

        }])
        posts.push(doc,comment)
    }
   
    return posts ? res.status(200).json({message:'done', posts})
                : next(new Error('faild fatsh data ',{cuase:400}))

} 








export const addPost=async (req,res,next)=>{
    const {title,caption}=req.body;
    console.log(Types.ObjectId.isValid(req.user.id));
    console.log(req.file.path);
    
   
    const{public_id,secure_url}= await Cloudinary.uploader.upload(req.file.path,{folder:`post/${req.user.id}`})
        if(!public_id) {
            return next(new Error('falid create post ',{cuase:401}))
        }   
    const post=await postModel.create({userID:req.user.id,title,caption,image:{public_id,secure_url}})
    return post ? res.status(200).json({message:"done",post})
                : next(new Error('falid create post ',{cuase:401}))

}

export const like=async(req,res,next)=>{
    const{id}=req.params
    const addLike= await postModel.findByIdAndUpdate(id,{
        $addToSet:{like:req.user.id},
        $pull:{UnLike:req.user.id}
    },{
        new:true
    })
    console.log(addLike);
    return addLike ? res.status(200).json({message:'done',addLike})
                    : next(new Error('faild add like', {cuase:400}))

}
export const unLike=async(req,res,next)=>{
    const{id}=req.params
   

    const pullLike= await postModel.findByIdAndUpdate(id,{
        $addToSet:{UnLike: req.user.id},
        $pull:{like: req.user.id}
    },{
        new:true
    })
    return pullLike ? res.status(200).json({message:'done',pullLike})
                    : next(new Error('faild add like', {cuase:400}))

}
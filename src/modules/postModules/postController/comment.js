import { CommentModel } from "../../../../DB/model/commentModel.js"
import Cloudinary from "../../../utils/Cloudinary.js"


//=====================  child parent  =================// 

export const AddComment=async(req,res,next)=>{
    req.body.postID=req.params.id

   req.body.userID=req.user.id
    req.body.commentTeyp='comment'
    if(req.file){
       const{public_id,secure_url}= await Cloudinary.uploader.upload(req.file.path,{folder:`post/coment/${req.body.postID}`})
       
       req.body.image={public_id,secure_url}
       if(!public_id) {
        return next(new Error('falid upload post ',{cuase:401}))
    }   
    }
    const comment =await CommentModel.create(req.body)
    return comment ? res.status(200).json({message:"done",comment})
                : next(new Error('falid create post ',{cuase:401}))


}
export const AddReplyOnComment=async(req,res,next)=>{
    req.body.postID=req.params.id
    req.body.commentID=req.params.commentId
   req.body.userID=req.user.id
   req.body.commentType='reply'



   const comment=await CommentModel.findOne({_id:req.body.commentID, postID:req.params.id})
    if(!comment){return next(new Error('not founed that comment'),{cuase:404})}
    
    if(req.file){
       const{public_id,secure_url}= await Cloudinary.uploader.upload(req.file.path,{folder:`post/coment/${req.body.commentID}`})
       
       req.body.image={public_id,secure_url}
       if(!public_id) {
        return next(new Error('falid upload post ',{cuase:401}))
    }   
    }
       
    const reply =await CommentModel.create(req.body)
           comment.reply.push(reply._id)
           await comment.save()
    return reply ? res.status(200).json({message:"done",reply})
                : next(new Error('falid create post ',{cuase:401}))


}
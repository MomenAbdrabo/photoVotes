import userModel from "../../../../DB/model/userModel.js"
import cloudinary from "../../../utils/Cloudinary.js";
import { combareValue, hashValue } from "../../../utils/Hash&Combare.js"

export const profilePic=async(req,res,next)=>{

    console.log(req.file.path);
    const{public_id,secure_url}= await cloudinary.uploader.upload(req.file.path,{folder:`user/profile`})

    if(!public_id||!secure_url){
        return next(Error('fialed connection'),{cuase:401})
    }

    const user= await userModel.findByIdAndUpdate(req.user.id,
    {profilePic :{secure_url,public_id}},{new:true})

    //await cloudinary.uploader.destroy(user.profilePic.public_id)
    res.status(200).json({message:"done",user})
}

export const profile=  async (req,res,next)=>{
    
    const user =await userModel.findById(req.user._id)
    console.log(user);
    if(!user){
        return next(new Error('user not exist',{cuase:404}))
    }
    res.status(200).json({message:'done',user})
}

export const sharedProfileData = async (req, res, next) => {
    const user = await userModel.findById(req.params.id).select('userName email profilePic')
    return user ? res.status(200).json({ message: "Done", user }) :
        next(new Error('In-valid account Id', { cause: 404 }))
}

export const updatePassword = async (req, res, next) => {
    const { _id } = req.user;
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(_id)
    if (!combareValue({ plaintext: oldPassword, hashValue: user.password })) {
        return next(new Error("In-valid old Password", { cause: 400 }))
    }
    const hashPassword = hashValue({ plaintext: newPassword })
    user.password = hashPassword;
    await user.save();
    return res.status(200).json({ message: "Done" })
}

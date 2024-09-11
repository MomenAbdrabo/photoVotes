import userModel from "../DB/model/userModel.js"
import { verifyToken } from "../src/utils/generat$varifayToken.js"




export const Authorization=async(req,res,next)=>{
    const{authorization}=req.headers
   //// console.log(authorization);

    if(!authorization?.startsWith(process.env.Bearer_Key)){
        return next(new Error('in-valid token',{cuase:400}))
    }
    const token =authorization.split(process.env.Bearer_Key)[1]
    //console.log(token);
    const decoded=verifyToken({token:token,signature:process.env.signatureToken})
    //console.log(decoded);
    if(!decoded.id){
        return next(new Error('in-valid token',{cuase:400}))
    }

    const user = await userModel.findById(decoded.id)
    //console.log(user);
    if(!user){
        return next(new Error('that email not register',{cuase:400}))
    }

    req.user=user
    //console.log(req.user);
    return next()


}
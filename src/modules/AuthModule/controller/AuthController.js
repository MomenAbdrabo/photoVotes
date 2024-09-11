import userModel from "../../../../DB/model/userModel.js"
import { combareValue, hashValue } from "../../../utils/Hash&Combare.js"
import { generateToken, verifyToken } from "../../../utils/generat$varifayToken.js"
import { sendEmail } from "../../../utils/sendEmail.js"


//======================== signUp ======================//

export const SignUp=async (req,res,next)=>{
const {email,password,userName}=req.body

const user =await userModel.find({email})
 if(!user.length==0){
   // return res.json({message:"email exist"})
   return next(new Error("email exist",{cuase:404}))
 }

const token = generateToken({payloud:{email},signature:process.env.signatureToken,
   expiredTime:60*7})
const newtoken = generateToken({payloud:{email},signature:process.env.signatureToken,
   expiredTime:60*60*24})

 const link=`http://localhost:3000/user/confirmEmail/${token}`
 const restartlink=`http://localhost:3000/user/restartEmail/${newtoken}`
 const html=`<a href="${link}"> please click to confirm email  </a><br><br>
 
             <a href="${restartlink}">  click to restart email  </a>
 `
const info=await sendEmail({
 to:email,
 subject:"Hello ✔",
 text: "Hello world?",
 html,
})

if(!info){
   return next(new Error('email reject', {cuase:404}))
}



 const hashResult= hashValue({planText:password,saltRound:process.env.saltRound})

 const addedUser =await userModel.create({userName,
   email,password:hashResult})
    return res.status(200).json({message:"wellcome",addedUser})
}
//======================== Email Section ======================//

export const confirmEmail=async(req,res,next)=>{
   const {token}=req.params
   
   const decoded= verifyToken({token,signature:process.env.signatureToken})
  
   if(!decoded){
      return next(new Error('in-valid token',{cuase:400}))
   }
  const user= await userModel.updateOne({email:decoded.email},{confirmEmail:true})
   return user.modifiedCount ? res.status(200).redirect(`https://www.linkedin.com/in/momen-abdrabo-5856722a7/`)
                             :res.status(400).send('not register account')  
}


export const restartEmail= async(req,res,next)=>{
   const {token}=req.params
   
   const {email}= verifyToken({token,signature:process.env.signatureToken}) 

   const newtoken = generateToken({payloud:{email},signature:process.env.signatureToken,
      expiredTime:60*7})

   
    const link=`http://localhost:3000/user/confirmEmail/${newtoken}`
    const restartlink=`http://localhost:3000/user/restartEmail/${token}`
    const html=`<a href="${link}"> please click to confirm email  </a><br><br>
    
                <a href="${restartlink}">  click to restart email  </a>
    `
   const info=await sendEmail({
    to:email,
    subject:"Hello ✔",
    text: "Hello world?",
    html,
   })
   
   if(!info){
      return next(new Error('email reject', {cuase:404}))
   }
   res.json("check your email")

}
//======================== sign in ======================//

export const logIn=async(req,res,next)=>{
   const {email,password}=req.body

  const user= await userModel.findOne({email})
  
   if(!user){
      return next(new Error("that email not exist"))
   }
   const match=combareValue({planText:password,hashtext:user.password})
   if(!match){
      return next(new Error("password not match"))
   }
   /// generat token
   const id=user._id
  const token= generateToken({payloud:{email,isLogin:true,id}
   ,signature:process.env.signatureToken,expiredTime:60*60})

   return res.status(200).json({message:"you are welcome",token})


}

//======================== Password section ======================//


export const ForGetPassword=async(req,res,next)=>{
   const{email}=req.body
/// joi email required
   const check_Email=await userModel.findOne({email})
   if(!check_Email){
      return next(new Error('email not exist'),{cuase:401})
   }
   const token = generateToken({payloud:{ email, id:check_Email._id },expiredTime:60*60})
   const link= `${req.protocol}://${req.headers.host}/Auth/resetPassword/${token}`
    const html=`<a href="${link}"> please click to reset password  </a>`

    const info=await sendEmail({
      to:email,
      subject:"vote App",
      text: "rest password",
      html,
     })
     
     if(!info){
        return next(new Error('email reject', {cuase:404}))
     }
     res.json("check your email")
}

export const ResetPassword=async(req,res,next)=>{
   const {token}=req.params
   const {newPassword,confirmPassword}=req.body
   const decoded=verifyToken({token,signature:process.env.signatureToken})
   
   const hashResult= hashValue({planText:newPassword,saltRound:process.env.saltRound})

   const updatePassword=await userModel.findByIdAndUpdate(decoded.id,{password:hashResult},{new:true})
   if(updatePassword.modifiedCount){
      return res.status(200).json({message:'done'})
   }else{
      return next(new Error('faild update password',{cuase:400}))
   }
}
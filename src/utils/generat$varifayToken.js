import jwt from "jsonwebtoken"


export const generateToken=({payloud='',signature=process.env.signatureToken,
expiredTime=60*60}={})=>{
   
    const token=jwt.sign(payloud,signature,{expiresIn: parseInt(expiredTime)})
        return token
}
export const verifyToken=({token='',signature=process.env.signatureToken}={})=>{
   
    const decoded=jwt.verify(token,signature)
        return decoded
}
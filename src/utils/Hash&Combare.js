import bcrypt from 'bcryptjs'


export const hashValue=({planText='',saltRound=process.env.saltRound})=>{
   const  match= bcrypt.hashSync(planText,parseInt(saltRound))
   return  match
}
export const combareValue=({planText='',hashtext=''})=>{
   const result= bcrypt.compareSync(planText,hashtext)
   return result
}
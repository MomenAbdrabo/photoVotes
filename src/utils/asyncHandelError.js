
export const  asyncHandler=(fn)=>{
    return(req,res,next)=>{
        fn(req,res,next).catch(err=>{
            console.log(err);
           // return res.json({message:"catch error",err,stack:err.stack})
          return next(new Error( err))
          
        })
    }
}


export const globalErrorHandler=(err,req,res,next)=>{
    if(err){
        if(process.env.MOOD=="dev"){
            res.json({message:err.message ,err, stack:err.stack})
        }
        res.json({message:err.message })
    }
}
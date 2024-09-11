import multer from "multer";


// import path from "path"
// import fs from 'fs'
// import { fileURLToPath } from "url";
// import {nanoid} from 'nanoid'
//const __dirname=path.dirname(fileURLToPath(import.meta.url))
export const fileValidation={
    image:['image/jpeg','image/png','image/gif'],
    
}


//================ uploud by cloudinary ===============//

export function uploadFile(customValidation=[]){
   
    const storage=multer.diskStorage({})
    function fileFulter(req,file,next){
        if(customValidation.includes(file.mimetype)){
             cb(null,true)

        }else{
            cb('in-vaild file format',false)
        }
    }
    const uploads=multer({fileFulter,storage})
    return uploads
}

























//======================= Uploud Use Multer =====================

// export function uploadFile(customPath='general',customValidation=[]){
//     const fullPath=path.join(__dirname,`../uploads/${customPath}`)
//         if(!fs.existsSync(fullPath)){
//             fs.mkdirSync(fullPath,{recursive:true})
//         }
//     const storage=multer.diskStorage({

//         destination:(req,file,cb)=>{
            
//              cb(null,fullPath)

//         },
//         filename:(req,file,cb)=>{
//                 const uniqueName= nanoid() +file.originalname
//                 file.des=`uploads/${customPath}/${uniqueName}`
//              cb(null,uniqueName)
//         }
//     })
//     function fileFulter(req,file,next){
//         if(customValidation.includes(file.mimetype)){
//              cb(null,true)

//         }else{
//             cb('in-vaild file format',false)
//         }
//     }
//     const uploads=multer({fileFulter,storage})
//     return uploads
// }
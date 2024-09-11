
import { json } from "express"
import connectionDB from "../DB/connection.js"
import { AuthRouter } from "./modules/AuthModule/Auth.router.js"
import { globalErrorHandler } from "./utils/asyncHandelError.js"
import { UserRouter } from "./modules/userModules/user.router.js"
import path from 'path'
import { fileURLToPath } from "url"
import { postRouter } from "./modules/postModules/post.router.js"


const __dirname=path.dirname(fileURLToPath(import.meta.url))

 const initAPP=(app,express)=>{
    connectionDB()
    app.use(json({}))

    app.use('/uploads',express.static(path.join(__dirname,'./uploads')))
    app.use('/Auth',AuthRouter)
    app.use('/user',UserRouter)
    app.use('/post',postRouter)



    app.use(globalErrorHandler)


    app.all("*", (req, res, next) => {
        return res.json({ message: "In-valid method or URL or Both please check your routing" })
    })



}

export default initAPP
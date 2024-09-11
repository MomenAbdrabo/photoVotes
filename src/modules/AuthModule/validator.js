import joi from 'joi'
import { generalValidation } from '../../../Middleware/validation.js'

export const signUpSchema={
    
    body:joi.object({

    userName: generalValidation.userName,
    email: generalValidation.email,
    password: generalValidation.password,
    cPassword:generalValidation.cPassword.valid(joi.ref('password')
    )
}).required()

}
export const loginSchema = {
    body: joi.object({
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required()
    }).required()
}

export const ForGetPassword={
    body:joi.object({
        email:generalValidation.email
    }).required()
}
export const ResetPassword={
    body:joi.object({
        newPassword:generalValidation.password,
        confirmPassword:generalValidation.cPassword.valid(joi.ref('newPassword'))
    }).required()
}
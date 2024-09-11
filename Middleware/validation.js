
import joi from "joi"
import { Types } from "mongoose"
const dataMethods = ["body", 'params', 'query' , 'headers','file']

const idValidate=(value,helpar)=>{
      return  Types.ObjectId.isValid(value)?true : helpar.message("in-valid id")

}

export const generalValidation={
    userName: joi.string().min(3).max(25).alphanum().required(),
    email: joi.string().email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ['com', 'net',] }
    }).required(),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    cPassword: joi.string().required(),
    id:joi.string().custom(idValidate).required(),
    title:joi.string().min(5).max(150).required(),
    caption:joi.string().min(5).max(1000).required(),
    file:joi.object({
        size:joi.number().positive().required(),
        path:joi.string().required(),
        filename:joi.string().required(),
        destination:joi.string().required(),
        mimetype:joi.string().required(),
        encoding:joi.string().required(),
        originalname:joi.string().required(),
        fieldname:joi.string().required(),
        dest:joi.string(),
    })
}

export const validation = (schema) => {
    return (req, res, next) => {
        const validationErr = []
        dataMethods.forEach(key => {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key], { abortEarly: false })
                if (validationResult.error) {
                    validationErr.push(validationResult.error.details)
                }
            }
        });

        if (validationErr.length) {
            return res.json({ message: "Validation Err", validationErr })
        }
        return next()
    }
}
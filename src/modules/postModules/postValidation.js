import joi from "joi";
import { generalValidation } from "../../../Middleware/validation.js";


export const addPostSchema={
    body: joi.object({
        title:generalValidation.title,
        caption:generalValidation.caption
    }).required(),

    file:generalValidation.file.required()
}

export const likeSchema={
    params:joi.object({
        id:generalValidation.id
    }).required()
}
export const unlikeSchema={
    params:joi.object({
        id:generalValidation.id
    }).required()
}
export const showPostSchema={
    query:joi.object({
        page_Number:joi.number().integer().positive().required(),
        numbarsOfPosts:joi.number().integer().positive().required()
    }).required()
}
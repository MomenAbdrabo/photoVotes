import { Router } from "express";
import { Authorization } from "../../../Middleware/Authorization.js";
import { asyncHandler } from "../../utils/asyncHandelError.js";
import { fileValidation, uploadFile } from "../../utils/Multer.js";
import { addPost, like, showPost, unLike } from "./postController/Post.js";
import { validation } from "../../../Middleware/validation.js";
import { addPostSchema, likeSchema, showPostSchema, unlikeSchema } from "./postValidation.js";
import { AddComment, AddReplyOnComment } from "./postController/comment.js";

export const postRouter =Router()


postRouter.post('/addPost',Authorization,
uploadFile(fileValidation.image).single('image'),validation(addPostSchema),
asyncHandler(addPost))

postRouter.patch('/like/:id',Authorization,
validation(likeSchema),
asyncHandler(like))

postRouter.patch('/unlike/:id',Authorization,
validation(unlikeSchema),
asyncHandler(unLike))
postRouter.get('/getPosts',validation(showPostSchema),asyncHandler(showPost))
// ======================== comment section ======================= //

postRouter.post('/:id/comment',Authorization,
uploadFile(fileValidation.image).single('image'),asyncHandler(AddComment))

postRouter.post('/:id/:commentId/comment/reply',Authorization,
uploadFile(fileValidation.image).single('image'),asyncHandler(AddReplyOnComment))
import { Router } from "express";
import { Authorization } from "../../../Middleware/Authorization.js";
import { asyncHandler } from "../../utils/asyncHandelError.js";
import { profile ,profilePic} from "./userController/userController.js";
import { fileValidation, uploadFile } from "../../utils/Multer.js";
import { validation } from "../../../Middleware/validation.js";
import { profilePicValidation } from "./validator.js";

export const UserRouter=Router()


UserRouter.patch('/profilePic',Authorization,uploadFile(fileValidation.image).single('image'),asyncHandler(profilePic))

UserRouter.get(`/profile`,validation(profilePicValidation),Authorization,asyncHandler(profile))

import { Router } from "express";
import { SignUp,logIn,confirmEmail, restartEmail } from "./controller/AuthController.js";
import { asyncHandler } from "../../utils/asyncHandelError.js";
import { validation } from "../../../Middleware/validation.js";
import { signUpSchema } from "./validator.js";

export const AuthRouter =Router()

AuthRouter.post('/signUp',validation(signUpSchema),asyncHandler(SignUp))
AuthRouter.get('/confirmEmail/:token',asyncHandler(confirmEmail))
AuthRouter.get('/restartEmail/:token',asyncHandler(restartEmail))
AuthRouter.post('/logIn',asyncHandler(logIn))
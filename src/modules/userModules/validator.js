import joi from "joi";
import { generalValidation } from "../../../Middleware/validation.js";





export const profilePicValidation={
    file:generalValidation.file.required()
}
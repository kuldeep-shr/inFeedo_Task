import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { sendAPIErrorResponse } from "../utils/apiResponse";

const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const userRegisterSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error, value } = userRegisterSchema.validate(data);
  console.log("validation-data", data);

  if (error) {
    sendAPIErrorResponse(res, [], error.details[0].message);
    return null;
  }
  next();
};

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const userLoginSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error, value } = userLoginSchema.validate(data);
  console.log("validation-data", data);

  if (error) {
    sendAPIErrorResponse(res, [], error.details[0].message);
    return null;
  }
  next();
};

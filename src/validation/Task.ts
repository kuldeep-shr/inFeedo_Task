import Joi from "joi";
import { Request, Response, NextFunction } from "express";
enum task_status {
  open_tasks = "open_tasks",
  inprogress_tasks = "inprogress_tasks",
  completed_tasks = "completed_tasks",
}

import { sendAPIErrorResponse } from "../utils/apiResponse";

const createTaskSchema = Joi.array()
  .items(
    Joi.object()
      .keys({
        title: Joi.string().required(),
        description: Joi.string()
          .required()
          .error(new Error("Please Enter the description")),
        scheduled_at: Joi.date().min("now").optional().allow(""),
      })
      .required()
  )
  .min(1)
  .required();
export const createTaskSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error, value } = createTaskSchema.validate(data.tasks);
  if (error) {
    console.log("error", error);
    if (error.details[0].type == "array.includesRequiredUnknowns") {
      sendAPIErrorResponse(res, [], "Please pass atleast single task");
      return null;
    }
    if (error.details[0].type == "date.min") {
      sendAPIErrorResponse(res, [], "Enter the Valid scheduled_date");
      return null;
    }
    if (error.details[0].type == "object.unknown") {
      sendAPIErrorResponse(res, [], "Please check the api keys");
      return null;
    } else {
      sendAPIErrorResponse(res, [], error.details[0].message);
      return null;
    }
  }
  next();
};

const updateTaskSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().allow("").min(10).optional(),
  description: Joi.string().allow("").min(10).optional(),
  status: Joi.string()
    .valid(...Object.values(task_status))
    .optional(),
  scheduled_at: Joi.date().min("now").optional(),
});

export const updateTaskSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error, value } = updateTaskSchema.validate(data);
  if (error) {
    if (error.details[0].type == "date.min") {
      sendAPIErrorResponse(
        res,
        [],
        "Please Enter the valid date, we do not accept past date"
      );
      return null;
    } else if (error.details[0].type == "any.only") {
      sendAPIErrorResponse(
        res,
        [],
        "Please Pass these status [open_tasks, inprogress_tasks, completed_tasks]"
      );
      return null;
    } else {
      sendAPIErrorResponse(res, [], error.details[0].message);
      return null;
    }
  }
  next();
};

const taskListSchema = Joi.object({
  id: Joi.number().allow(0),
  title: Joi.string().allow(""),
  status: Joi.array().items(Joi.string().valid(...Object.values(task_status))),
  scheduled_at: Joi.string().allow(""),
  created_at: Joi.string().allow(""),
  updated_at: Joi.string().allow(""),
  current_page: Joi.number(),
  total_item: Joi.number(),
});
export const taskListSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error, value } = taskListSchema.validate(data);
  if (error) {
    if (error.details[0].type == "any.only") {
      console.log("error", error);
      sendAPIErrorResponse(
        res,
        [],
        "Please Pass these status [open_tasks, inprogress_tasks, completed_tasks]"
      );
      return null;
    } else {
      sendAPIErrorResponse(res, [], error.details[0].message);
      return null;
    }
  }
  next();
};

const paginationSchema = Joi.object({
  status: Joi.array().items(Joi.string().valid(...Object.values(task_status))),
  scheduled_at: Joi.string().allow(""),
});
export const paginationSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { error, value } = paginationSchema.validate(data);
  if (error) {
    if (error.details[0].type == "any.only") {
      console.log("error", error);
      sendAPIErrorResponse(
        res,
        [],
        "Please Pass these status [open_tasks, inprogress_tasks, completed_tasks]"
      );
      return null;
    } else {
      sendAPIErrorResponse(res, [], error.details[0].message);
      return null;
    }
  }
  next();
};

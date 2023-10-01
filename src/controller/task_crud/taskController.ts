import httpStatusCodes from "http-status-codes";
import { CreateTaskApiPayload } from "./task_type";
import { Metrics, Output } from "../../model/task";
import { Request, Response } from "express";
import {
  createTaskQuery,
  getTaskByIdQuery,
  updateTaskQuery,
  getAllTaskQuery,
  getCountOfTaskDataQuery,
} from "../../model/Task";
import apiResponse from "../../utils/apiResponse";
import { arrayToString } from "../../helper/operation";

export const initialRoute = (req: Request, res: Response) => {
  apiResponse.result(res, "Task Management Service", [], httpStatusCodes.OK);
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { tasks }: CreateTaskApiPayload = req.body;
    const tasksArrangement: any = [];
    tasks.map((data) => {
      return tasksArrangement.push({
        title: data.title,
        description: data.description,
        scheduled_at: data.scheduled_at,
        created_by: req.body.user.name == "guest" ? 999 : req.body.user.id,
      });
    });
    const insertTask = await createTaskQuery(tasksArrangement);
    if (!insertTask.isError) {
      apiResponse.result(
        res,
        "Task has been created successfully",
        insertTask,
        httpStatusCodes.CREATED
      );
      return null;
    } else {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        "Something Went Wrong"
      );
      return null;
    }
  } catch (err) {
    apiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      "Internal Server Error"
    );
    return null;
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const isTaskExistOrNot: any = await getTaskByIdQuery(req.body.id);
    req.body.tasks = isTaskExistOrNot[0];
    if (isTaskExistOrNot.length == 0) {
      apiResponse.error(
        res,
        httpStatusCodes.NOT_FOUND,
        "This Task is not exist"
      );
      return null;
    }
    const updateTask = await updateTaskQuery(req.body);
    if (!updateTask.isError) {
      apiResponse.result(
        res,
        "Task has been updated successfully",
        [],
        httpStatusCodes.OK
      );
      return null;
    } else {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        "Something Went Wrong"
      );
      return null;
    }
  } catch (err) {
    apiResponse.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR);
    return null;
  }
};

export const getAllTask = async (req: Request, res: Response) => {
  /*
    Return the list of tasks according to the created by user
  */

  try {
    const {
      id = 0,
      status,
      scheduled_at,
      created_at,
      updated_at,
      current_page,
      total_item = 5, // By default set to 5
    } = req.body;
    const currentPage =
      current_page == 0 || current_page == 1
        ? 0
        : current_page * total_item - total_item;
    const statusModified = arrayToString(status);
    const taskData: any = await getAllTaskQuery({
      id: id,
      scheduled_at: scheduled_at,
      status: statusModified,
      created_at: created_at,
      updated_at: updated_at,
      userId: req.body.user.name == "guest" ? 999 : req.body.user.id,
      current_page: currentPage,
      total_item: total_item,
    });
    if (taskData.length > 0) {
      apiResponse.result(res, "Task list", taskData, httpStatusCodes.OK);
      return null;
    } else {
      apiResponse.result(
        res,
        "No Task list found",
        taskData,
        httpStatusCodes.OK
      );
      return null;
    }
  } catch (err) {
    console.log(err);
    apiResponse.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR);
    return null;
  }
};

export const taskPagination = async (req: Request, res: Response) => {
  try {
    const { status, scheduled_at } = req.body;
    const statusModified = arrayToString(status);
    const taskData: any = await getCountOfTaskDataQuery({
      scheduled_at: scheduled_at,
      status: statusModified,
      userId: req.body.user.name == "guest" ? 999 : req.body.user.id,
    });
    const metric: Metrics = {};
    taskData.forEach((item: any) => {
      metric[item.status] = item.status_count;
    });
    const output: Output = scheduled_at
      ? {
          date: scheduled_at,
          metrics: metric,
        }
      : (metric as Output);

    if (output) {
      apiResponse.result(res, "Task list", output, httpStatusCodes.OK);
      return null;
    } else {
      apiResponse.result(res, "No Task list", output, httpStatusCodes.OK);
      return null;
    }
  } catch (err) {
    apiResponse.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR);
    return null;
  }
};

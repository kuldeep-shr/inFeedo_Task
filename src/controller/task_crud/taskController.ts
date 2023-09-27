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
import {
  sendAPIErrorResponse,
  sendAPISuccessResponse,
} from "../../utils/apiResponse";
import { arrayToString } from "../../helper/operation";

/*
  Create the Task API

*/

export const createTask = async (req: Request, res: Response) => {
  const { tasks }: CreateTaskApiPayload = req.body;
  const tasksArrangement: any = [];
  tasks.map((data) => {
    return tasksArrangement.push({
      title: data.title,
      description: data.description,
      scheduled_at: data.scheduled_at,
      created_by: req.body.user.id,
    });
  });
  try {
    const insertTask = await createTaskQuery(tasksArrangement);
    if (!insertTask.isError) {
      sendAPISuccessResponse(res, [], "Task has been created successfully");
    } else {
      sendAPIErrorResponse(res, [], "Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    sendAPIErrorResponse(res, [], "Something Went Wrong");
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const isTaskExistOrNot: any = await getTaskByIdQuery(req.body.id);
    req.body.tasks = isTaskExistOrNot[0];
    if (isTaskExistOrNot.length == 0) {
      sendAPIErrorResponse(res, [], "This Task is not exist");
      return null;
    }
    const updateTask = await updateTaskQuery(req.body);
    if (!updateTask.isError) {
      sendAPISuccessResponse(res, [], "Task has been updated successfully");
    } else {
      sendAPIErrorResponse(res, [], "Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    sendAPIErrorResponse(res, [], "Something Went Wrong");
  }
};

export const getAllTask = async (req: Request, res: Response) => {
  /*
    this method will get all of task which is assigned by you 
  */

  try {
    const {
      id = 0,
      status,
      scheduled_at,
      created_at,
      updated_at,
      current_page,
      total_item = 5,
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
      userId: req.body.user.id,
      current_page: currentPage,
      total_item: total_item,
    });
    sendAPISuccessResponse(res, taskData, "success");
  } catch (err) {
    sendAPISuccessResponse(res, [], "Something went wrong");
  }
};

export const taskPagination = async (req: Request, res: Response) => {
  try {
    const { status, scheduled_at } = req.body;
    const statusModified = arrayToString(status);
    const taskData: any = await getCountOfTaskDataQuery({
      scheduled_at: scheduled_at,
      status: statusModified,
      userId: req.body.user.id,
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

    sendAPISuccessResponse(res, output, "success");
  } catch (err) {
    sendAPISuccessResponse(res, [], "Something went wrong");
  }
};

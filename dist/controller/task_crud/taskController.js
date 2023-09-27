"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskPagination = exports.getAllTask = exports.updateTask = exports.createTask = void 0;
const Task_1 = require("../../model/Task");
const apiResponse_1 = require("../../utils/apiResponse");
const operation_1 = require("../../helper/operation");
/*
  Create the Task API

*/
const createTask = async (req, res) => {
    const { tasks } = req.body;
    const tasksArrangement = [];
    tasks.map((data) => {
        return tasksArrangement.push({
            title: data.title,
            description: data.description,
            scheduled_at: data.scheduled_at,
            created_by: req.body.user.id,
        });
    });
    try {
        const insertTask = await (0, Task_1.createTaskQuery)(tasksArrangement);
        if (!insertTask.isError) {
            (0, apiResponse_1.sendAPISuccessResponse)(res, [], "Task has been created successfully");
        }
        else {
            (0, apiResponse_1.sendAPIErrorResponse)(res, [], "Something Went Wrong");
        }
    }
    catch (err) {
        console.log(err);
        (0, apiResponse_1.sendAPIErrorResponse)(res, [], "Something Went Wrong");
    }
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    try {
        const isTaskExistOrNot = await (0, Task_1.getTaskByIdQuery)(req.body.id);
        req.body.tasks = isTaskExistOrNot[0];
        if (isTaskExistOrNot.length == 0) {
            (0, apiResponse_1.sendAPIErrorResponse)(res, [], "This Task is not exist");
            return null;
        }
        const updateTask = await (0, Task_1.updateTaskQuery)(req.body);
        if (!updateTask.isError) {
            (0, apiResponse_1.sendAPISuccessResponse)(res, [], "Task has been updated successfully");
        }
        else {
            (0, apiResponse_1.sendAPIErrorResponse)(res, [], "Something Went Wrong");
        }
    }
    catch (err) {
        console.log(err);
        (0, apiResponse_1.sendAPIErrorResponse)(res, [], "Something Went Wrong");
    }
};
exports.updateTask = updateTask;
const getAllTask = async (req, res) => {
    /*
      this method will get all of task which is assigned by you
    */
    try {
        const { id = 0, status, scheduled_at, created_at, updated_at, current_page, total_item = 5, } = req.body;
        const currentPage = current_page == 0 || current_page == 1
            ? 0
            : current_page * total_item - total_item;
        const statusModified = (0, operation_1.arrayToString)(status);
        const taskData = await (0, Task_1.getAllTaskQuery)({
            id: id,
            scheduled_at: scheduled_at,
            status: statusModified,
            created_at: created_at,
            updated_at: updated_at,
            userId: req.body.user.id,
            current_page: currentPage,
            total_item: total_item,
        });
        (0, apiResponse_1.sendAPISuccessResponse)(res, taskData, "success");
    }
    catch (err) {
        (0, apiResponse_1.sendAPISuccessResponse)(res, [], "Something went wrong");
    }
};
exports.getAllTask = getAllTask;
const taskPagination = async (req, res) => {
    try {
        const { status, scheduled_at } = req.body;
        const statusModified = (0, operation_1.arrayToString)(status);
        const taskData = await (0, Task_1.getCountOfTaskDataQuery)({
            scheduled_at: scheduled_at,
            status: statusModified,
            userId: req.body.user.id,
        });
        const metric = {};
        taskData.forEach((item) => {
            metric[item.status] = item.status_count;
        });
        const output = scheduled_at
            ? {
                date: scheduled_at,
                metrics: metric,
            }
            : metric;
        (0, apiResponse_1.sendAPISuccessResponse)(res, output, "success");
    }
    catch (err) {
        (0, apiResponse_1.sendAPISuccessResponse)(res, [], "Something went wrong");
    }
};
exports.taskPagination = taskPagination;
//# sourceMappingURL=taskController.js.map
import express from "express";
const router = express.Router();

import { verifyToken } from "../middleware/commonMiddlewares";
import {
  userRegisterSchemaValidation,
  userLoginSchemaValidation,
} from "../validation/Login";

import {
  createTaskSchemaValidation,
  updateTaskSchemaValidation,
  taskListSchemaValidation,
  paginationSchemaValidation,
} from "../validation/Task";

import { createUser, loginUser } from "../controller/login/signup";
import {
  createTask,
  updateTask,
  getAllTask,
  taskPagination,
} from "../controller/task_crud/taskController";

router.post("/signup", userRegisterSchemaValidation, createUser);
router.post("/login", userLoginSchemaValidation, verifyToken, loginUser);

router.post(
  "/create-task",
  createTaskSchemaValidation,
  verifyToken,
  createTask
);

router.post(
  "/update-task",
  updateTaskSchemaValidation,
  verifyToken,
  updateTask
);

router.post("/tasks", taskListSchemaValidation, verifyToken, getAllTask);

router.post(
  "/tasks-pagination",
  paginationSchemaValidation,
  verifyToken,
  taskPagination
);

export const allRoutes = router;

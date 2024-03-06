import express from "express";
const router = express.Router();

import { verifyToken } from "../middleware/commonMiddlewares";
import { createUser, loginUser } from "../controller/login/signup";

import { userRegisterSchemaValidation } from "../validation/Login";

router.post("/signup", userRegisterSchemaValidation, createUser);
// router.post("/signup", userRegisterSchemaValidation, createUser);
// router.post("/login", userLoginSchemaValidation, verifyToken, loginUser);

// router.post(
//   "/create-task",
//   createTaskSchemaValidation,
//   verifyToken,
//   createTask
// );

// router.post(
//   "/update-task",
//   updateTaskSchemaValidation,
//   verifyToken,
//   updateTask
// );

// router.post("/tasks", taskListSchemaValidation, verifyToken, getAllTask);

// router.post(
//   "/tasks-pagination",
//   paginationSchemaValidation,
//   verifyToken,
//   taskPagination
// );

export const allRoutes = router;

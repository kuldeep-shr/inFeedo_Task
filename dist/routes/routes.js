"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const commonMiddlewares_1 = require("../middleware/commonMiddlewares");
const Login_1 = require("../validation/Login");
const Task_1 = require("../validation/Task");
const signup_1 = require("../controller/login/signup");
const taskController_1 = require("../controller/task_crud/taskController");
router.post("/signup", Login_1.userRegisterSchemaValidation, signup_1.createUser);
router.post("/login", Login_1.userLoginSchemaValidation, commonMiddlewares_1.verifyToken, signup_1.loginUser);
router.post("/create-task", Task_1.createTaskSchemaValidation, commonMiddlewares_1.verifyToken, taskController_1.createTask);
router.post("/update-task", Task_1.updateTaskSchemaValidation, commonMiddlewares_1.verifyToken, taskController_1.updateTask);
router.post("/tasks", Task_1.taskListSchemaValidation, commonMiddlewares_1.verifyToken, taskController_1.getAllTask);
router.post("/tasks-pagination", Task_1.paginationSchemaValidation, commonMiddlewares_1.verifyToken, taskController_1.taskPagination);
exports.allRoutes = router;
//# sourceMappingURL=routes.js.map
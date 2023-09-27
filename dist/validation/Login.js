"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchemaValidation = exports.userRegisterSchemaValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const apiResponse_1 = require("../utils/apiResponse");
const userRegisterSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
const userRegisterSchemaValidation = (req, res, next) => {
    const data = req.body;
    const { error, value } = userRegisterSchema.validate(data);
    console.log("validation-data", data);
    if (error) {
        (0, apiResponse_1.sendAPIErrorResponse)(res, [], error.details[0].message);
        return null;
    }
    next();
};
exports.userRegisterSchemaValidation = userRegisterSchemaValidation;
const userLoginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
const userLoginSchemaValidation = (req, res, next) => {
    const data = req.body;
    const { error, value } = userLoginSchema.validate(data);
    console.log("validation-data", data);
    if (error) {
        (0, apiResponse_1.sendAPIErrorResponse)(res, [], error.details[0].message);
        return null;
    }
    next();
};
exports.userLoginSchemaValidation = userLoginSchemaValidation;
//# sourceMappingURL=Login.js.map
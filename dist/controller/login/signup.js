"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const database_1 = require("../../DATABASE/database");
const apiResponse_1 = require("../../utils/apiResponse");
const commonMiddlewares_1 = require("../../middleware/commonMiddlewares");
const User_1 = require("../../model/User");
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    //first check email existency
    const isPersonExistOrNot = await (0, User_1.getUserByEmail)(email);
    if (isPersonExistOrNot.length > 0) {
        (0, apiResponse_1.sendAPIErrorResponse)(res, [], "This Email is already exist");
        return null;
    }
    const getHashPassword = await (0, commonMiddlewares_1.hashPassword)(password);
    const sql = `
    INSERT INTO users
    (
      name,
      email,
      password
    )
    VALUES(
      ?,
      ?,
      ?
    )
  `;
    database_1.connection.query(sql, [name, email, getHashPassword], (error, result) => {
        if (result) {
            const parsedDbData = JSON.parse(JSON.stringify(result));
            const getToken = (0, commonMiddlewares_1.generateToken)({
                id: parsedDbData.insertId,
                secretKey: process.env.SECRET_KEY,
                user: req.body,
            });
            const _a = req.body, { ["password"]: removedValue } = _a, user_modified = __rest(_a, ["password"]);
            const sendResponse = Object.assign(Object.assign({ id: parsedDbData.insertId }, user_modified), { token: getToken, token_validity: "24 Hours" });
            (0, apiResponse_1.sendAPISuccessResponse)(res, sendResponse, "success");
        }
        else {
            console.log("er", error);
            (0, apiResponse_1.sendAPIErrorResponse)(res, [], "Something Went Wrong");
        }
    });
};
exports.createUser = createUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const isPersonExistOrNot = await (0, User_1.getUserByEmail)(email);
    if (isPersonExistOrNot.length == 0) {
        (0, apiResponse_1.sendAPISuccessResponse)(res, [], "Please first register yourself, then you can continue with Login");
        return null;
    }
    const isPasswordMatchOrNot = await (0, commonMiddlewares_1.verifyPassword)({
        id: req.body.user.id,
        email: req.body.user.user.email,
        inputPassword: password,
    });
    if (isPasswordMatchOrNot) {
        const getToken = (0, commonMiddlewares_1.generateToken)({
            id: req.body.user.id,
            secretKey: process.env.SECRET_KEY,
            user: req.body.user,
        });
        const _a = req.body.user.user, { ["password"]: removedValue } = _a, user_modified = __rest(_a, ["password"]);
        const sendResponse = Object.assign(Object.assign({ id: req.body.user.id }, user_modified), { token: getToken, token_validity: "24 Hours" });
        (0, apiResponse_1.sendAPISuccessResponse)(res, sendResponse, "success");
    }
    else {
        (0, apiResponse_1.sendAPIErrorResponse)(res, [], "Please check your credentials");
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=signup.js.map
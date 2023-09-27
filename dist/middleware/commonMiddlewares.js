"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.verifyPassword = exports.hashPassword = exports.verifyToken = void 0;
const User_1 = require("../model/User");
const apiResponse_1 = require("../utils/apiResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token.split(" ")[1], process.env.SECRET_KEY);
            req.body.user = decoded;
            next();
        }
        else {
            (0, apiResponse_1.sendAPIErrorResponse)(res, [], "Access denied. No token provided.");
        }
    }
    catch (error) {
        (0, apiResponse_1.sendAPIErrorResponse)(res, [], "Invalid token.");
    }
};
exports.verifyToken = verifyToken;
const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};
exports.hashPassword = hashPassword;
const verifyPassword = async (arg) => {
    // console.log("req-user", req.user);
    const getDataOfSingleUser = await (0, User_1.getUserById)(arg.id);
    console.log("getDataOfSingleUser", getDataOfSingleUser);
    if (getDataOfSingleUser.length === 0) {
        let res;
        (0, apiResponse_1.sendAPIErrorResponse)(res, [], "User not found");
    }
    const user = getDataOfSingleUser[0];
    const hashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(arg.inputPassword, hashedPassword);
    if (passwordMatch) {
        return passwordMatch;
    }
    else {
        return false;
    }
};
exports.verifyPassword = verifyPassword;
const generateToken = (arg) => {
    try {
        const token = jsonwebtoken_1.default.sign({ id: arg.id, user: arg.user }, arg.secretKey, {
            expiresIn: "24h",
        });
        return token;
    }
    catch (err) {
        let res;
        (0, apiResponse_1.sendAPIErrorResponse)(res, [], "Problem in Generating JWT token");
    }
};
exports.generateToken = generateToken;
//# sourceMappingURL=commonMiddlewares.js.map
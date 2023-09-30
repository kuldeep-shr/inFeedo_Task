import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import apiResponse from "../../utils/apiResponse";
import { ApiResponse } from "./signup_types";
import {
  hashPassword,
  verifyPassword,
  generateToken,
} from "../../middleware/commonMiddlewares";
import { createUserQuery, getUserByEmail } from "../../model/User";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    //check email existency
    const isPersonExistOrNot: any = await getUserByEmail(email);
    if (isPersonExistOrNot.length > 0) {
      apiResponse.error(
        res,
        httpStatusCodes.CONFLICT,
        "Email is already exist"
      );
      return null;
    }
    const getHashPassword = await hashPassword(password);
    const response = await createUserQuery({
      name: name,
      email: email,
      password: getHashPassword,
    });

    if (response) {
      const parsedDbData = JSON.parse(JSON.stringify(response));
      const getToken = generateToken({
        id: parsedDbData.insertId,
        secretKey: String(process.env.SECRET_KEY),
        user: req.body,
      });
      const { ["password"]: removedValue, ...user_modified } = req.body;
      const sendResponse: ApiResponse = {
        id: parsedDbData.insertId,
        ...user_modified,
        token: getToken,
        token_validity: "24 Hours",
      };
      apiResponse.result(
        res,
        "User has been created successfully",
        sendResponse,
        httpStatusCodes.CREATED
      );
      return null;
    } else {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        "Something Went Wrong"
      );
    }
  } catch (err) {
    apiResponse.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: any = await getUserByEmail(email);
    const parsedDbData = JSON.parse(JSON.stringify(user));
    if (user.length == 0) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        "Email not exist, Please sign up with this email"
      );
      return null;
    }
    const isPasswordMatchOrNot = await verifyPassword({
      id: req.body.user.id,
      email: req.body.user.user.email,
      inputPassword: password,
      hashPassword: parsedDbData[0].password,
    });
    if (isPasswordMatchOrNot) {
      const getToken = generateToken({
        id: req.body.user.id,
        secretKey: String(process.env.SECRET_KEY),
        user: req.body.user,
      });
      const { ["password"]: removedValue, ...user_modified } =
        req.body.user.user;
      const sendResponse: ApiResponse = {
        id: req.body.user.id,
        ...user_modified,
        token: getToken,
        token_validity: "24 Hours",
      };
      apiResponse.result(
        res,
        "Login successfully",
        sendResponse,
        httpStatusCodes.OK
      );
      return null;
    } else {
      apiResponse.error(res, httpStatusCodes.BAD_REQUEST, "Incorrect Password");
    }
  } catch (err) {
    apiResponse.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

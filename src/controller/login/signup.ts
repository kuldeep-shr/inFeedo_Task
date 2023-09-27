import { connection } from "../../DATABASE/database";
import { Request, Response } from "express";
import {
  sendAPISuccessResponse,
  sendAPIErrorResponse,
} from "../../utils/apiResponse";
import { ApiResponse } from "./signup_types";
import {
  hashPassword,
  verifyPassword,
  generateToken,
} from "../../middleware/commonMiddlewares";
import { getUserByEmail } from "../../model/User";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  //first check email existency
  const isPersonExistOrNot: any = await getUserByEmail(email);
  if (isPersonExistOrNot.length > 0) {
    sendAPIErrorResponse(res, [], "This Email is already exist");
    return null;
  }
  const getHashPassword = await hashPassword(password);
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
  connection.query(sql, [name, email, getHashPassword], (error, result) => {
    if (result) {
      const parsedDbData = JSON.parse(JSON.stringify(result));

      const getToken = generateToken({
        id: parsedDbData.insertId,
        secretKey: process.env.SECRET_KEY,
        user: req.body,
      });
      const { ["password"]: removedValue, ...user_modified } = req.body;
      const sendResponse: ApiResponse = {
        id: parsedDbData.insertId,
        ...user_modified,
        token: getToken,
        token_validity: "24 Hours",
      };

      sendAPISuccessResponse(res, sendResponse, "success");
    } else {
      console.log("er", error);
      sendAPIErrorResponse(res, [], "Something Went Wrong");
    }
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const isPersonExistOrNot: any = await getUserByEmail(email);
  if (isPersonExistOrNot.length == 0) {
    sendAPISuccessResponse(
      res,
      [],
      "Please first register yourself, then you can continue with Login"
    );
    return null;
  }
  const isPasswordMatchOrNot = await verifyPassword({
    id: req.body.user.id,
    email: req.body.user.user.email,
    inputPassword: password,
  });
  if (isPasswordMatchOrNot) {
    const getToken = generateToken({
      id: req.body.user.id,
      secretKey: process.env.SECRET_KEY,
      user: req.body.user,
    });
    const { ["password"]: removedValue, ...user_modified } = req.body.user.user;
    const sendResponse: ApiResponse = {
      id: req.body.user.id,
      ...user_modified,
      token: getToken,
      token_validity: "24 Hours",
    };
    sendAPISuccessResponse(res, sendResponse, "success");
  } else {
    sendAPIErrorResponse(res, [], "Please check your credentials");
  }
};

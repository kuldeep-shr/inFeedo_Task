import { Request, Response, NextFunction } from "express";
import { VerifyPasswordTypes, TokenAssignedTypes } from "./common_middleware";
import { getUserById } from "../model/User";
import { sendAPIErrorResponse } from "../utils/apiResponse";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
      req.body.user = decoded;
      next();
    } else {
      sendAPIErrorResponse(res, [], "Access denied. No token provided.");
    }
  } catch (error) {
    sendAPIErrorResponse(res, [], "Invalid token.");
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const verifyPassword = async (
  arg: VerifyPasswordTypes
): Promise<boolean> => {
  // console.log("req-user", req.user);
  const getDataOfSingleUser: any = await getUserById(arg.id);
  console.log("getDataOfSingleUser", getDataOfSingleUser);

  if (getDataOfSingleUser.length === 0) {
    let res;
    sendAPIErrorResponse(res, [], "User not found");
  }

  const user = getDataOfSingleUser[0];
  const hashedPassword = user.password;
  const passwordMatch = await bcrypt.compare(arg.inputPassword, hashedPassword);
  if (passwordMatch) {
    return passwordMatch;
  } else {
    return false;
  }
};

export const generateToken = (arg: TokenAssignedTypes): any => {
  try {
    const token = jwt.sign({ id: arg.id, user: arg.user }, arg.secretKey, {
      expiresIn: "24h",
    });

    return token;
  } catch (err) {
    let res;
    sendAPIErrorResponse(res, [], "Problem in Generating JWT token");
  }
};

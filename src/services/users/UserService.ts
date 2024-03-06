import { User, LoginRequest } from "./types";
import {
  hashPassword,
  generateToken,
  verifyPassword,
} from "../../middleware/commonMiddlewares";
import UserModel from "../../model/user/User";
import moment from "moment";

export const insertUser = (data: User) => {
  return new Promise(async (resolve, reject) => {
    // check email exist or not
    const emailExistency: any = await isEmailExists(data.email);
    if (emailExistency.data) {
      return reject({
        isError: true,
        message: "user already registered",
        data: [],
      });
    }
    const hasingPassword = await hashPassword(data.password);
    UserModel.create({
      name: data.name,
      firstname: data.name.split(" ")[0],
      lastname: data.name.split(" ")[1],
      password: hasingPassword,
      email: data.email,
      address: data.address,
      createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
      updatedAt: moment().format("YYYY-MM-DD hh:mm:ss"),
    })
      .then((data) => {
        const tokenGeneration = generateToken({
          id: data.id,
          user: {
            name: data.name,
            email: data.email,
          },
          secretKey: process.env.SECRET_KEY,
        });
        resolve({
          isError: false,
          message: "user registered successfully",
          data: [
            {
              id: data.id,
              name: data.name,
              email: data.email,
              token: tokenGeneration,
            },
          ],
        });
      })
      .catch((error) => {
        reject({
          isError: true,
          message: "error while,user registration",
          data: error,
        });
      });
  });
};

export const userLogin = (data: LoginRequest) => {
  return new Promise(async (resolve, reject) => {
    // check email exist or not
    const emailExistency: any = await isEmailExists(data.email);
    if (!emailExistency.data) {
      return reject({
        isError: true,
        message: "user is not registered with us",
        data: [],
      });
    }
    const getDataOfUser: any = await UserModel.findOne({
      where: { email: data.email },
    });
    console.log("getDataOfUser....", getDataOfUser);
    const isPasswordMatchOrNot = await verifyPassword({
      id: getDataOfUser.id,
      email: data.email,
      inputPassword: data.password,
      hashPassword: getDataOfUser.password,
    });
  });
};

const isEmailExists = async (email: string) => {
  return new Promise(async (resolve, reject) => {
    UserModel.findOne({ where: { email: email } })
      .then((data: any) => {
        resolve({
          isError: false,
          message: "user already exists",
          data: [null, undefined].includes(data) ? false : true,
        });
      })
      .catch((error) => {
        reject({
          isError: true,
          message: "error while,email existing",
          data: error,
        });
      });
  });
};

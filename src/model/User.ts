import { connection } from "../DATABASE/database";
import { SingleUser, CreateUser } from "./user";

export const createUserQuery = (arg: CreateUser): any => {
  return new Promise((resolve, reject) => {
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
    connection.query(
      sql,
      [arg.name, arg.email, arg.password],
      (error, result) => {
        if (result) {
          return resolve(result);
        } else {
          return reject(error);
        }
      }
    );
  });
};

export const getUserById = (id: number): Promise<SingleUser> => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM users WHERE id IN(?);
    `;
    connection.query(sql, [id], (error, result) => {
      if (result) {
        const parsedDbData = JSON.parse(JSON.stringify(result));
        console.log("QQQQQQQQ", parsedDbData);
        resolve(parsedDbData);
      } else {
        reject(error);
      }
    });
  });
};

export const getUserByEmail = (email: string): Promise<SingleUser> => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM users WHERE email LIKE ?;
    `;
    connection.query(sql, [email], (error, result) => {
      if (result) {
        const parsedDbData = JSON.parse(JSON.stringify(result));
        resolve(parsedDbData);
      } else {
        reject(error);
      }
    });
  });
};

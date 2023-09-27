import { connection } from "../DATABASE/database";

type SingleUserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export const getUserById = (id: number): Promise<SingleUserType> => {
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

export const getUserByEmail = (email: string): Promise<SingleUserType> => {
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

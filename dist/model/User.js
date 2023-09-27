"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.getUserById = void 0;
const database_1 = require("../DATABASE/database");
const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `
      SELECT * FROM users WHERE id IN(?);
    `;
        database_1.connection.query(sql, [id], (error, result) => {
            if (result) {
                const parsedDbData = JSON.parse(JSON.stringify(result));
                console.log("QQQQQQQQ", parsedDbData);
                resolve(parsedDbData);
            }
            else {
                reject(error);
            }
        });
    });
};
exports.getUserById = getUserById;
const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const sql = `
      SELECT * FROM users WHERE email LIKE ?;
    `;
        database_1.connection.query(sql, [email], (error, result) => {
            if (result) {
                const parsedDbData = JSON.parse(JSON.stringify(result));
                resolve(parsedDbData);
            }
            else {
                reject(error);
            }
        });
    });
};
exports.getUserByEmail = getUserByEmail;
//# sourceMappingURL=User.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountOfTaskDataQuery = exports.getAllTaskQuery = exports.getTaskByIdQuery = exports.updateTaskQuery = exports.createTaskQuery = void 0;
const database_1 = require("../DATABASE/database");
const createTaskQuery = (arg) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const obj of arg) {
                const { title, description, scheduled_at, created_by } = obj;
                const sql = `
        INSERT INTO tasks(
          title,
          description,
          scheduled_at,
          created_by
        ) 
        VALUES(
          ?,
          ?,
          ?,
          ?
          );
      `;
                database_1.connection.execute(sql, [
                    title,
                    description,
                    scheduled_at ? scheduled_at : null,
                    created_by,
                ]);
            }
            resolve({ isError: false });
        }
        catch (error) {
            reject({ isError: true });
        }
    });
};
exports.createTaskQuery = createTaskQuery;
const updateTaskQuery = (arg) => {
    return new Promise(async (resolve, reject) => {
        const dbTitle = arg.tasks.title;
        const dbdescription = arg.tasks.description;
        const dbstatus = arg.tasks.status;
        const dbscheduled_at = arg.tasks.scheduled_at;
        try {
            const sql = `
        UPDATE tasks
        SET 
          title=?,
          description=?,
          status=?,
          updated_at=NOW(),
          scheduled_at=?
        WHERE
          id=?
      `;
            database_1.connection.query(sql, [
                "title" in arg ? arg.title : dbTitle,
                "description" in arg ? arg.description : dbdescription,
                "status" in arg ? arg.status : dbstatus,
                "scheduled_at" in arg ? arg.scheduled_at : dbscheduled_at,
                arg.id,
            ], (error, result) => {
                if (result) {
                    resolve({ isError: false });
                }
                else {
                    console.log(error);
                    resolve({ isError: true });
                }
            });
        }
        catch (error) {
            reject({ isError: true });
        }
    });
};
exports.updateTaskQuery = updateTaskQuery;
const getTaskByIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `
      SELECT 
        id,
        title,
        description,
        DATE_FORMAT(created_at,'%Y-%m-%d, %H:%i:%s') AS created_at,
        DATE_FORMAT(updated_at,'%Y-%m-%d, %H:%i:%s') AS updated_at, 
        DATE_FORMAT(scheduled_at,'%Y-%m-%d, %H:%i:%s') AS scheduled_at,
        status
      FROM tasks 
      WHERE id IN(?);
    `;
        database_1.connection.query(sql, [id], (error, result) => {
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
exports.getTaskByIdQuery = getTaskByIdQuery;
const getAllTaskQuery = (arg) => {
    return new Promise((resolve, reject) => {
        /*
          List Filters
          1) status
          2) scheduled_at
          3) taskId
          4) created_at
          5) updated_at
        */
        const sql = `
      SELECT 
        id,
        title,
        status,
        description,
        DATE_FORMAT(scheduled_at,'%Y-%m-%d,%H:%i:%s') AS scheduled_at,
        DATE_FORMAT(created_at,'%Y-%m-%d,%H:%i:%s') AS created_at,
        DATE_FORMAT(updated_at,'%Y-%m-%d,%H:%i:%s') AS updated_at
      FROM tasks
      WHERE
        1=1
        AND created_by=${arg.userId}
        ${arg.id != 0 ? ` AND id=${arg.id} ` : ``}
        ${arg.status ? ` AND status IN(${arg.status}) ` : ``}
        ${arg.title ? ` AND title LIKE '%${arg.title}%' ` : ``}
        ${arg.scheduled_at
            ? ` AND scheduled_at BETWEEN '${arg.scheduled_at} 00:00:00' AND  '${arg.scheduled_at} 23:59:59'`
            : ``}
        ${arg.created_at
            ? `AND created_at BETWEEN '${arg.created_at} 00:00:00' AND  '${arg.created_at} 23:59:59'`
            : ``}
        ${arg.updated_at
            ? `AND updated_at BETWEEN '${arg.updated_at} 00:00:00' AND '${arg.updated_at} 23:59:59'`
            : ``}
        ${arg.id != 0
            ? ``
            : `LIMIT ${arg.current_page},${arg.total_item == 0 ? 5 : arg.total_item}`}
    `;
        database_1.connection.query(sql, (error, result) => {
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
exports.getAllTaskQuery = getAllTaskQuery;
const getCountOfTaskDataQuery = (arg) => {
    return new Promise((resolve, reject) => {
        const sql = `
      SELECT 
        all_statuses.status,
        IFNULL(status_counts.status_count, 0) AS status_count
      FROM
      (SELECT 'open_tasks' AS status UNION ALL SELECT 'inprogress_tasks' UNION ALL SELECT 'completed_tasks') AS all_statuses
          LEFT JOIN
      (SELECT 
          status, COUNT(*) AS status_count
      FROM
          tasks
      WHERE
        1=1
        AND created_by=${arg.userId}
      ${arg.scheduled_at
            ? ` AND scheduled_at BETWEEN '${arg.scheduled_at} 00:00:00' AND  '${arg.scheduled_at} 23:59:59'`
            : ``}
      ${arg.status ? ` AND status IN(${arg.status}) ` : ``}
      GROUP BY status) AS status_counts ON all_statuses.status = status_counts.status;
    `;
        database_1.connection.query(sql, (error, result) => {
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
exports.getCountOfTaskDataQuery = getCountOfTaskDataQuery;
//# sourceMappingURL=Task.js.map
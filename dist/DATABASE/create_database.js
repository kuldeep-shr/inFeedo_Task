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
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
async function createDatabaseAndTable() {
    // Create a MySQL database connection
    const connection = mysql2_1.default.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });
    try {
        // Create the database if it doesn't exist
        connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        connection.query(`USE ${process.env.DB_NAME}`);
        // Create a table if it doesn't exist
        connection.query(`
    CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLE_NAME_1} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(45) DEFAULT NULL,
      description VARCHAR(100) DEFAULT NULL,
      status ENUM('open_tasks','inprogress_tasks','completed_tasks') DEFAULT 'open_tasks',
      scheduled_at DATETIME DEFAULT NULL,
      created_at DATETIME DEFAULT NOW(),
      updated_at DATETIME DEFAULT NULL,
      created_by INT DEFAULT 0
    )
  `);
        connection.query(`
      CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLE_NAME_2} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(40),
        email VARCHAR(40) UNIQUE,
        password VARCHAR(200)
      )
`);
        console.log("Database and table created successfully.");
    }
    catch (error) {
        console.error("Error creating database and table:", error);
    }
    finally {
        connection.end();
    }
}
createDatabaseAndTable();
//# sourceMappingURL=create_database.js.map
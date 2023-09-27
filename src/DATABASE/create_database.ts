import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

async function createDatabaseAndTable() {
  // Create a MySQL database connection
  const connection = mysql.createConnection({
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
  } catch (error) {
    console.error("Error creating database and table:", error);
  } finally {
    connection.end();
  }
}
createDatabaseAndTable();

import mysql from "mysql2";

// Create a MySQL database connection
export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the database");

  // Define the SQL statement to create your table
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255)
    )
  `;

  // Execute the SQL statement to create the table
  connection.query(createTableSQL, (err) => {
    if (err) {
      console.error("Error creating the table:", err.message);
    } else {
      console.log("Table created or already exists");
    }

    // Close the database connection
    // connection.end((err) => {
    //   if (err) {
    //     console.error("Error closing the database connection:", err.message);
    //   } else {
    //     console.log("Closed the database connection");
    //   }
    // });
  });
});

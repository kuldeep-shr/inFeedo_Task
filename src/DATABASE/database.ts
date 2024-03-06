import { Sequelize } from "sequelize";

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./grocery_management.db",
});

export default sequelize;

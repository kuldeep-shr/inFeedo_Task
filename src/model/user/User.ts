import { DataTypes, Model } from "sequelize";
import sequelize from "../../DATABASE/database";

class User extends Model {
  public id!: number;
  public name!: string;
  public firstname!: string;
  public lastname!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    firstname: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    lastname: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: true,
      defaultValue: null,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    // createdAt: true,
    // updatedAt: true,
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;

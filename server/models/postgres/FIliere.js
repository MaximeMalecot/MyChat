// Create Filiere model
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const bcryptjs = require("bcryptjs");

class Filiere extends Model {}

Filiere.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: connection,
    modelName: "filiere",
  }
);

module.exports = Filiere;

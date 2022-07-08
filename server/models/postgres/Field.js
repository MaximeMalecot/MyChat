// Create Filiere model
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Field extends Model {}

Field.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: connection,
    modelName: "field",
  }
);

module.exports = Field;

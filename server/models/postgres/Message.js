// Create Message model using sequelize with email, password, firstname and isAdmin
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Message extends Model{};

Message.init(
    {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        modelName: "message",
        paranoid: true,
    }
)


module.exports = Message;
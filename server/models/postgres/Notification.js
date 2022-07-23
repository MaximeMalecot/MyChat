const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const { NOTIFICATION_TYPES, SUB_FRIENDSHIP_TYPES} = require("../../constants/enums");

class Notification extends Model {}

Notification.init(
    {
        content: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
        },
        type: {
            type: DataTypes.ENUM(Object.keys(NOTIFICATION_TYPES)),
            allowNull: false,
        },
        subType: {
            type: DataTypes.ENUM(Object.keys(SUB_FRIENDSHIP_TYPES)),
            allowNull: true,
        }
    },
    {
        sequelize: connection,
        modelName: "notification",
        paranoid: true,
    }
)

module.exports = Notification;
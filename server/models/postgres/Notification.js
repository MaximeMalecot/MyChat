const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const { NOTIFICATION_TYPES } = require("../../constants/enums");

class Notification extends Model {}

Notification.init(
    {
        status: {
            type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
        },
        type: {
            type: DataTypes.ENUM(Object.keys(NOTIFICATION_TYPES)),
            allowNull: false,
        }
    },
    {
        sequelize: connection,
        modelName: "notification",
        paranoid: true,
    }
)

module.exports = Notification;
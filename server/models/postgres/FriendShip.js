// Create Message model using sequelize with email, password, firstname and isAdmin
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const {FRIEND_STATUS} = require('../../constants/enums');

class FriendShip extends Model{};

FriendShip.init(
    {
        status: {
            type: DataTypes.ENUM(FRIEND_STATUS),
            allowNull: false,
            defaultValue: FRIEND_STATUS[0],
        }
    },
    {
        sequelize: connection,
        modelName: "friendship",
        paranoid: true,
    }
)

module.exports = FriendShip;




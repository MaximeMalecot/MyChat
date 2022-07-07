// Create Message model using sequelize with email, password, firstname and isAdmin
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class FriendShip extends Model{};

FriendShip.init(
    {
        status: {
            type: DataTypes.ENUM("CREATED", "ACCEPTED", "REFUSED", "DELETED"),
            allowNull: false,
            defaultValue: "CREATED",
        }
    },
    {
        sequelize: connection,
        modelName: "friendship",
        paranoid: true,
    }
)

module.exports = FriendShip;




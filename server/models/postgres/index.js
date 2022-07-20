const { User: UserMongo } = require("../mongo");
const mongoose = require("mongoose");

exports.connection = require("./db");
exports.User = require("./User");
exports.Field = require("./Field");
exports.Message = require("./Message");
exports.FriendShip = require("./FriendShip");

exports.User.belongsTo(exports.Field);
exports.Field.hasMany(exports.User);

exports.Message.belongsTo(exports.User, { foreignKey: 'sender'});
exports.User.hasMany(exports.Message, { foreignKey: 'sender'});

exports.Message.belongsTo(exports.User, { foreignKey: 'receiver'});
exports.User.hasMany(exports.Message, { foreignKey: 'receiver'});

exports.FriendShip.belongsTo(exports.User, { foreignKey: 'sender'});
exports.User.hasMany(exports.FriendShip, { foreignKey: 'sender'});

exports.FriendShip.belongsTo(exports.User, { foreignKey: 'receiver'});
exports.User.hasMany(exports.FriendShip, { foreignKey: 'receiver'});

const denormalizeUser = async (user) => {
    const pgUser = await exports.User.findByPk(user.id, {
        attributes: [
            "id", "email", "firstName", "lastName"
        ],
    })
    const mongoUser = new UserMongo({
        //_id: mongoose.Types.ObjectId(pgUser.id),
        userId: pgUser.id,
        email: pgUser.email, 
        firstName: pgUser.firstName,
        lastName: pgUser.lastName
    });
    mongoUser.save()
    .catch(console.error)
}

exports.User.addHook("afterCreate", denormalizeUser);

exports.User.addHook("beforeDestroy", async(user) => {
    //cherche toutes les friendlist ayant le user dans la friendList
    //
    UserMongo.updateMany({
        "user.friendlist.userId": user.id
    },
    {
        $unset: {
            "user.friendlist.userId" : user.id
        }
    })
    .then(() => user.destroy())
    .catch(console.error);
})
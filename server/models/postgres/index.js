const { User: UserMongo } = require("../mongo");

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

function denormalizeUser(user){
    exports.User.findByPk(user.id, {
        attributes: [
            "id", "name"
        ],
    }).then((result) => {
        const mongoUser = new UserMongo(result);
        mongoUser.save()
            .then(console.log(data))
            .catch(console.error);
    })
}

exports.User.addHook("afterCreate", denormalizeUser);
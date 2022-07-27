const { User: UserMongo } = require("../mongo");

exports.connection = require("./db");
exports.User = require("./User");
exports.Techno = require("./Techno");
exports.Field = require("./Field");
exports.Message = require("./Message");
exports.Notification = require('./Notification');
exports.Report = require('./Report');

exports.Field.hasMany(exports.User);
exports.User.belongsTo(exports.Field);

exports.User.belongsToMany(exports.Techno,{ through: 'user_technos' });
exports.Techno.belongsToMany(exports.User,{ through: 'user_technos' });

exports.Message.belongsTo(exports.User, { foreignKey: 'sender'});
exports.User.hasMany(exports.Message, { foreignKey: 'sender'});

exports.Message.belongsTo(exports.User, { foreignKey: 'receiver'});
exports.User.hasMany(exports.Message, { foreignKey: 'receiver'});

exports.Notification.belongsTo(exports.User, { foreignKey: 'senderId'});
exports.User.hasMany(exports.Notification, { foreignKey: 'senderId'});

exports.Notification.belongsTo(exports.User, { foreignKey: 'recipientId'});
exports.User.hasMany(exports.Notification, { foreignKey: 'recipientId'});

exports.Report.belongsTo(exports.User, { foreignKey: 'reporter'});
exports.User.hasMany(exports.Report, { foreignKey: 'reporter'});
exports.Report.belongsTo(exports.User, { foreignKey: 'reported'});
exports.User.hasMany(exports.Report, { foreignKey: 'reported'});


const denormalizeUser = async (user) => {
    const mongoUser = new UserMongo({
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        friendList: []
    });

    mongoUser.save()
        .catch(console.error);

};

const denormalizeForFriends = async (user) => {
    try{
        UserMongo.updateOne(
                {userId: user.id},
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                }
            ).then(console.log)
            .catch(console.error);
        UserMongo.updateMany(
                {
                    "friendList.userId": user.id
                },
                {
                    $set: {
                        "friendList.$[item].firstName": user.firstName,
                        "friendList.$[item].lastName": user.lastName, 
                    } 
                },
                {
                    arrayFilters: [
                        {
                            "item.userId": user.id
                        }
                    ]
                }                
            ).then(console.log)
            .catch(console.error);
    }catch(e){
        console.error(e);
    }
}

const deleteFromFriends = async (user) => {
    //cherche toutes les friendlist ayant le user dans la friendList
    //
    try {
        await UserMongo.updateMany(
            { friendList: { $elemMatch: { userId: user.id } } },
            { $pull: { friendList: { userId: user.id } } },              
        ).catch(console.error);
        await UserMongo.remove({userId: user.id})
            .then(console.log)
            .catch(console.error);
    }catch(err){
        console.error(err);
    }
    
};

// const denormalizeDelete = async(user) => {
//     try {

//     } catch(err) {
//         console.error(err);
//     }
// };



exports.User.addHook("afterCreate", denormalizeUser);
exports.User.addHook("afterUpdate", denormalizeForFriends);
exports.User.addHook("beforeDestroy", deleteFromFriends)
const { User: UserMongo} = require('../models/mongo');
const { Notification } = require("../models/postgres");
const { NOTIFICATION_TYPES, SUB_FRIENDSHIP_TYPES} = require("../constants/enums");
const { broadcastKnown} = require("./sse");

const notifyFriendShip = ({subType, sender, recipient}) => {
    if( !SUB_FRIENDSHIP_TYPES[subType] ) throw new Error('Invalid sub type');
    let msg = "";
    switch(SUB_FRIENDSHIP_TYPES[subType]){
        case SUB_FRIENDSHIP_TYPES.ACCEPTED:
            msg = `${sender.firstName} ${sender.lastName} has accepted your invitation`;
            break;
        case SUB_FRIENDSHIP_TYPES.RECEIVED:
            msg = `You've received a friend invitation from ${sender.firstName} ${sender.lastName}`;
    }

    notifyUser({
        type: NOTIFICATION_TYPES.FRIENDSHIP,
        subType,
        senderId: sender.userId,
        recipientId: recipient.userId
    }, msg);
}

const notifyUser = ({content, type, subType, senderId, recipientId}, customMsg="") => {
    try {
        if(!NOTIFICATION_TYPES[type]){
            throw new Error(`${type} is not a valid notification type`);
        }
        const user = UserMongo.findOne({userId: recipientId});
        if(user){
            Notification.create({
                content, type, subType, senderId, recipientId
            }).then(() => 
                broadcastKnown(
                    {
                    message: {
                        type: 'new_notification', 
                        data: customMsg
                    }, 
                    userId: recipientId
                })
            );
        }
    } catch (err){
        console.error(err);
        next();
    }
}

const getNotifications = async (req, res, next) => {
    try {
        let notifications = await Notification.findAll({
            where: {
                recipientId: req.user.id,
                status: false,
            }
        });
        notifications = await Promise.all(notifications.map(async (notification) => {
            let sender = await UserMongo.findOne({userId: notification.senderId}, { _id: 0, userId: 1, firstName: 1, lastName: 1 });
            let recipient = await UserMongo.findOne({userId: notification.recipientId}, { _id: 0, userId: 1, firstName: 1, lastName: 1 });
            return {
                content: notification.content,
                type: notification.type,
                subType: notification.subType,
                sender,
                recipient,
                read: notification.status,
                createdAt: notification.createdAt,
            }
        }));
        return res.status(200).json({
            notifications
        });
    } catch( err ){
        console.error(err);
        next();
    }
}

const readNotifications = async (req, res, next) => {
    try {
        await Notification.update({
                status: true,
            },{
                where: {
                    recipientId: req.user.id,
                    status: false,
                }
            }
        );
        return res.sendStatus(204);
    }catch(err){
        console.error(err);
        next()
    }
}


module.exports = { 
    getNotifications,
    readNotifications,
    notifyUser,
    notifyFriendShip
}

const {verifyToken} = require('../lib/jwt');
const { Notification } = require("../models/postgres");
const { NOTIFICATION_TYPES} = require("../constants/enums");
const { broadcastNotification } = require("./sse");

const createNotification = (type, message, id) => {
    if(!NOTIFICATION_TYPES[type]){
        console.error(`${type} is not a valid notification type`);
        return;
    }
    Notification.create({
        userId: id,
        type: NOTIFICATION_TYPES.FRIENDSHIP,
    }).then(() => { 
        broadcastNotification(message, id);
    }).catch(console.error);
}

const getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.findAll({
            where: {
                userId: user.id,
                status: false,
            }
        });
        res.status(200).json({
            notifications
        });
    } catch( err ){
        console.error(err);
        next();
    }
}


module.exports = { 
    getNotifications,
    createNotification
}

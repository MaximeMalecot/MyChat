const {verifyToken} = require('../lib/jwt');
const { Notification } = require("../models/postgres");
const { NOTIFICATION_TYPES} = require("../constants/enums");

const users = [];

const convertMessage = ({ type, ...data }) => {
    return `event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`;
};  

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

const broadcastNotification = (message, id) => {
    if(users[id]){
        users[id].write(convertMessage(message));
    }
};


const getSSE = (req, res, next) => {
    try {
        let { token } = req.query;
        if(!token){
            throw new Error('Token is required');
        }
        const user = verifyToken(req.query.token);
        if(!user){
            res.sendStatus(404);
        }
        users[user.id] = res;

        res.on("close", () => {
            delete users[user.id];
        });
        
        const headers = {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        };
        res.writeHead(200, headers);
    
        Notification.findAll({
            where: {
                userId: user.id,
                status: false,
            }
        }).then(notifications => {
            broadcastNotification({ type: 'connect', ...notifications}, user.id);
        }).catch(console.error);

    } catch(err){
        console.error(err)
    }
}

module.exports = {
    getSSE,
    createNotification
}
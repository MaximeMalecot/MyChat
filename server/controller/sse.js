const {verifyToken} = require('../lib/jwt');
const { randomUUID} = require('crypto');

const auth_users = [];
const unknow_users = [];

const convertMessage = ({ type, ...data }) => {
    return `event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`;
};  

const broadcastNotification = (message, id) => {
    if(auth_users[id]){
        auth_users[id].write(convertMessage(message));
    }
};

const broadcastUnknow = (message, client_id) => {
    if(auth_users[unknow_users[client_id]]){
        auth_users[unknow_users[client_id]].write(convertMessage(message));
    } else if(unknow_users[client_id]){
        unknow_users[client_id].write(convertMessage(message));
    }
}

const sseWithAuth = (client_id, userId) => {
    auth_users[userId] = unknow_users[client_id];
    unknow_users[client_id] = userId;
    auth_users[userId].write(convertMessage({type: 'auth'}));
}

const getSSE = (req, res, next) => {
    try {
        let { client_id, token} = req.query;
        if(!client_id){
            client_id = randomUUID();
        }
        if(token){
            const user = verifyToken(req.query.token);
            if(!user || !user.id){
                res.sendStatus(404);
            }
            auth_users[user.id] = res;
            unknow_users[client_id] = user.id;
        } else {
            unknow_users[client_id] = res;
        }

        res.on("close", () => {
            if(auth_users[unknow_users[client_id]]){
                delete auth_users[unknow_users[client_id]];
            }
            delete unknow_users[client_id];
        });
        
        const headers = {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        };
        res.writeHead(200, headers);

        broadcastUnknow({type: 'connect', client_id}, client_id);
    
        // Notification.findAll({
        //     where: {
        //         userId: user.id,
        //         status: false,
        //     }
        // }).then(notifications => {
        //     broadcastNotification({ type: 'connect', ...notifications}, user.id);
        // }).catch(console.error);

    } catch(err){
        console.error(err)
    }
}

const getLiveConnections = () => {
    return Object.values(unknow_users).length;
}

module.exports = {
    getSSE,
    broadcastNotification,
    getLiveConnections,
    sseWithAuth
}
const {verifyToken} = require('../lib/jwt');
const { randomUUID} = require('crypto');

const auth_users = {};
const users = {};

const convertMessage = ({ type, ...data }) => {
    return `event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`;
};

const broadcastUnknown = (message, client_id) => {
    if(users[client_id]){
        users[client_id].write(convertMessage(message));
    }
}

const broadcastKnown = ({message, userId}) => {
    console.log(message);
    console.log(userId);
    if(auth_users[userId]){
        console.log(userId);
        users[auth_users[userId]].write(convertMessage(message));
    }
}

const sseWithAuth = (client_id, userId) => {
    auth_users[userId] = client_id;
    users[auth_users[userId]].write(convertMessage({type: 'auth'}));
}

const getSSE = (req, res, next) => {
    try {
        let { client_id, token} = req.query;
        let user = null;
        if(!client_id){
            client_id = randomUUID();
        }
        if(token){
            user = verifyToken(req.query.token);
            if(!user || !user.id){
                res.sendStatus(404);
            }
            auth_users[user.id] = client_id;
        }
        users[client_id] = res;

        res.on("close", () => {
            if(user){
                if(auth_users[user.id]){
                    delete auth_users[user.id];
                }
            }
            delete users[client_id];
        });
        
        const headers = {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        };
        res.writeHead(200, headers);

        broadcastUnknown({type: 'connect', client_id}, client_id);
    } catch(err){
        console.error(err);
        next();
    }
}

const getLiveConnections = () => {
    console.log(Object.values(users).length, Object.values(users));
    console.log(Object.values(auth_users).length, Object.values(auth_users));
    return {
        authentified_users: Object.values(auth_users).length,
        unknown_users: Object.values(users).length
    };
}

module.exports = {
    getSSE,
    broadcastKnown,
    broadcastUnknown,
    getLiveConnections,
    sseWithAuth
}
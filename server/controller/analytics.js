const { randomUUID} = require('crypto');
const { SpecificLogger } = require("../lib/logger");

const connected_users = [];

const convertMessage = ({ type, ...data }) => {
    return `event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`;
};  

const broadcast = (message, client_id) => {
    connected_users[client_id].write(convertMessage(message));
};

exports.connect = async (req, res, next) => {
    let { client_id } = req.query;
    if(!client_id){
        client_id = randomUUID();
    }

    connected_users[client_id] = res;
    res.on("close", () => {
        delete connected_users[client_id];
    });
    
    const headers = {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    };
    res.writeHead(200, headers);

    broadcast({ type: 'connect', client_id}, client_id);
    
};

exports.getLiveConnections = async (req, res, next) => {
    try{
        return res.status(200).json({
            connected_users: Object.values(connected_users).length
        });
    }catch(err){
        next();
    }
}

exports.postAnalytic = async (req, res) => {
    try{
        res.sendStatus(201);
    }catch(err){
        next();
    }
}

exports.getAnalytics = async (req, res, next) => {
    try{
        res.sendStatus(200);
    }catch(err){
        next();
    }
}
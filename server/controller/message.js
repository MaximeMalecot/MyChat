const { User } = require("../models/postgres");
const { User: UserMongo, Message} = require("../models/mongo");
const { broadcastKnown } = require('./sse');
const { SpecificLogger, log } = require("../lib/logger");

exports.getConversations = async (req, res, next) => {
    try{
        const selfId = (req.user.id).toString();
        const friendList = (await UserMongo.aggregate([
            {
                $match: { 
                    
                            userId: req.user.id 
                },
            },
            {
                $project : {
                    _id: 0,
                    friends : {
                        $filter: {
                            input: "$friendList",
                            as: "friend",
                            cond: { $eq: ["$$friend.status", "ACCEPTED"] }
                        }
                    }
                }
            },
        ]))[0];
        if(!friendList.friends){
            return res.status(200).json([]);
        }
        let conversations = await Promise.all(friendList.friends.map(async (friend) => {
            let messages = await Message.aggregate([
                {
                    $match: {
                        $or: [
                            {
                                $and: [
                                    { "senderId": selfId },
                                    { "receiverId": friend.userId }
                                ]
                            },
                            {
                                $and: [ 
                                    { "senderId": friend.userId },
                                    { "receiverId": selfId }
                                ]
                            }
                        ]
                    }
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                }
            ])
            return {
                friend,
                lastMessage: messages[0] ? {
                    ...messages[0],
                    content: messages[0]?.deleted ? 'Deleted message' : messages[0]?.content
                } : null
            };
        }));
        conversations = Object.values(conversations).sort((a,b) => b.lastMessage?.createdAt - a.lastMessage?.createdAt);
        return res.status(200).json(conversations);
    }catch(err){
        console.error(err);
        next();
    }

}

exports.getMessages = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const selfId = (req.user.id).toString();
        const user = await UserMongo.findOne({ userId }, { _id: 0, friendList: 0, __v: 0 });
        let messages = await Message.aggregate([
            {
                $match: {
                    $or: [
                        {
                            $and: [
                                { "senderId": selfId },
                                { "receiverId": userId }
                            ]
                        },
                        {
                            $and: [ 
                                { "senderId": userId },
                                { "receiverId": selfId }
                            ]
                        }
                    ]
                }
            },
            {
                $sort: {
                    createdAt: 1
                }
            }
        ])
        if(messages.length > 0){
            messages = messages.map((obj) => {
                if(obj.deleted){
                    return {
                        ...obj,
                        content: 'Deleted message'
                    }
                } 
                return obj;
            });
        }
        return res.status(200).json({user, messages});
    }catch(err){
        console.error(err);
        next();
    }
}

exports.sendMessage = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const { content } = req.body;
        let receiver = await User.findOne({ userId });
        if(!receiver){
            SpecificLogger(req, {
                message:`${req.method} on '${req.originalUrl}' - User not found`,
				level: log.levels.warn
            })
            return res.status(404).json({
                message: "User not found"
            });
        }
        const message = await Message.create({
            senderId: req.user.id,
            receiverId: userId,
            content
        });
        broadcastKnown(
            {
            message: {
                type: 'new_message', 
                data: message
            }, 
            userId: userId
        });

        broadcastKnown(
            {
            message: {
                type: 'new_message', 
                data: message
            }, 
            userId: req.user.id
        });
        return res.status(201).json(message);
    }catch(err){
        console.error(err);
        next();
    }
}

exports.updateMessage = async (req, res, next) => {
    try{
        const { content, messageId} = req.body;
        if(!messageId || !content){
            SpecificLogger(req, {
                message:`${req.method} on '${req.originalUrl}' - User not found`,
				level: log.levels.warn
            });
            return res.sendStatus(400);
        }
        let message = await Message.findOneAndUpdate({_id: messageId}, {
            updated: true,
            content
        });
        broadcastKnown(
            {
            message: {
                type: 'new_message', 
                data: message
            }, 
            userId: message.receiverId
        });

        broadcastKnown(
            {
            message: {
                type: 'new_message', 
                data: message
            }, 
            userId: message.senderId
        });
        return res.sendStatus(200);
    } catch(err) {
        next();
    }
}

exports.deleteMessage = async (req, res, next) => {
    try {
        const { messageId } = req.params;
        if(!messageId){
            SpecificLogger(req, {
                message:`${req.method} on '${req.originalUrl}' - User not found`,
				level: log.levels.warn
            });
            return res.sendStatus(400);
        }
        let message = await Message.findOneAndUpdate({_id: messageId}, {
            deleted: true
        });
        message = {
            ...message.toObject(),
            content: 'Deleted message'
        }
        broadcastKnown(
            {
            message: {
                type: 'delete_message', 
                data:  message ,
            }, 
            userId: message.receiverId
        });

        broadcastKnown(
            {
            message: {
                type: 'delete_message', 
                data:  message ,
            }, 
            userId: message.senderId
        });
        return res.sendStatus(204)
    } catch(err) {
        console.error(err);
        next();
    }
}
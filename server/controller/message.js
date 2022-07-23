const { User, Message} = require("../models/mongo");

exports.getConversations = async (req, res, next) => {
    try{
        const friendList = (await User.aggregate([
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
        console.log(friendList.friends);
        const messages = friendList.friends.map((friend) => {
            Message.aggregate([
                {
                    $match: {
                        $or: [
                            { sender: req.user.id },
                            { receiver: friend.userId }
                        ]
                    }
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                }
            ]).then(
                (messages) => {
                    return messages[0];
                }
            )
        }).filter( msg => !!msg);
        console.log(messages);
        return res.status(200).json(messages);
    }catch(err){
        console.error(err);
        next();
    }

}
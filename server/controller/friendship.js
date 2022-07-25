const mongoose = require('mongoose');

const { User: UserMongo } = require("../models/mongo");
const { connection, User, Techno } = require("../models/postgres");
const { Op } = require('sequelize');
const { NOTIFICATION_TYPES, SUB_FRIENDSHIP_TYPES, FRIEND_STATUS} = require('../constants/enums');
const { notifyFriendShip } = require('../controller/notification');

const getUser = async id => {
    let user = await UserMongo.findOne({userId: id});
    if(user){
        return user.toObject();
    }else{
        throw new Error('User does not exist');
    }
};

exports.sendInvitation = async (req, res, next) => {
    try{
        if( req.params.id == req.user.id ){
            throw new Error('No one loves you :/');
        }

        const invitationExists = await UserMongo.findOne({userId: req.user.id, "friendList.userId": req.params.id});

        if(invitationExists){
            throw new Error('Exists');
        }

        if( !req.params.id ){
            throw new Error('Missing sender id');
        }

        
        const friendListObject = ({userId, lastName, firstName, status=FRIEND_STATUS["CREATED"]}) => {
            if( !userId || !lastName || !firstName ){
                throw new Error('Missing key(s)');
            }

            if( !FRIEND_STATUS[status] ){
                throw new Error('Invalid status');
            }

            return { userId, lastName, firstName, status };
        };

        const saveFriend = async (userId, friendListObj) => {
            await UserMongo.updateOne({userId}, {
                $push: { "friendList": friendListObj }
            })
            .then(console.log);
        };

        let receiver = await getUser(req.params.id);
        let sender = await getUser(req.user.id);

        let senderSchema = friendListObject({userId: receiver.id, ...receiver});
        let receiverSchema = friendListObject({userId: sender.id, status: FRIEND_STATUS["AWAITING"], ...sender});

        await saveFriend(sender.userId, senderSchema)
        await saveFriend(receiver.userId, receiverSchema);

        notifyFriendShip({subType: SUB_FRIENDSHIP_TYPES.RECEIVED, sender: sender, recipient: receiver});

        res.sendStatus(201);
    }catch(e){
        console.error(e);
        next();
    }
};

exports.getList = async (req, res, next) => {
    try{
        if( !req.params.userId ){
            throw new Error('Missing user id');
        }
        
        const friends = (
            await UserMongo.aggregate([
                {
                    $match: { userId: parseInt(req.params.userId) }
                },
                {
                    $project: { friendList: "$friendList" }
                },
                {
                    $unwind : "$friendList"
                },
                {
                    $match: { "friendList.status": FRIEND_STATUS["ACCEPTED"] }
                },
                {
                    $project: {
                        "friendList._id": 0
                    }
                }
            ])
        ).map(obj => obj.friendList);

        res.status(200).json(friends);
    }catch(e){
        console.error(e);
        next();
    }
};

exports.getInvitations = async (req, res, next) => {
    try{
        const invitations = (
            await UserMongo.aggregate([
                {
                    $match: { userId: req.user.id }
                },
                {
                    $project: {
                        friendList: "$friendList"
                    }
                },
                {
                    $unwind : "$friendList"
                },
                {
                    $match: { "friendList.status": FRIEND_STATUS["AWAITING"] }
                },
                {
                    $project: {
                        "friendList._id": 0
                    }
                }
            ])
        ).map(obj => obj.friendList);
        res.status(200).json(invitations);
    }catch(e){
        console.error(e);
        next();
    }
};

exports.acceptInvitation = async (req, res, next) => {
    try{
        if( !req.params.id ){
            throw new Error('Missing user id');
        }

        //Checking if the invitation is pending for the current user
        let invitation = await UserMongo.findOne({
            userId: req.params.id, 
            "friendList.$.status": FRIEND_STATUS["AWAITING"]
        } );

        if(!invitation){
            throw new Error('Invitation not found or you cannot accept an invitation for someone else');
        }

        let receiver = await getUser(req.user.id);
        let sender = await getUser(req.params.id);

        const updateUserInvitation = async (userId, friendId, status) => {
            await UserMongo.updateOne({userId}, 
                    {
                        "$set": {
                            "friendList.$[item].status": status
                        }
                    },
                    {
                        arrayFilters: [
                            {
                                "item.userId": {
                                    $eq: friendId
                                }
                            }
                        ],
                        multi: true
                    }
                )
            .then(console.log);
        };

        await updateUserInvitation(receiver.userId, sender.userId, FRIEND_STATUS["ACCEPTED"] );
        await updateUserInvitation(sender.userId, receiver.userId, FRIEND_STATUS["ACCEPTED"] );
        
        notifyFriendShip({subType: SUB_FRIENDSHIP_TYPES.ACCEPTED, sender: sender, recipient: sender});

        return res.sendStatus(200);
    }catch(e){
        console.error(e);
        next();
    }
};

exports.denyInvitation = async (req, res, next) => {
    try{
        if( !req.params.id ){
            throw new Error('Missing user id');
        }

        //Checking if the invitation is pending for the current user
        let invitation = await UserMongo.findOne({
            userId: req.params.id, 
            "friendList.$.status": FRIEND_STATUS["AWAITING"]
        } );

        if(!invitation){
            throw new Error('Invitation not found or you cannot accept an invitation for someone else');
        }

        let receiver = await getUser(req.user.id);
        let sender = await getUser(req.params.id);

        const deleteUserInvitation = async (userId, friendId) => {
            await UserMongo.updateOne({userId},
                    { $pull: { friendList: { userId: friendId } } },
                    { multi: false }
                )
            .then(console.log);
        };

        await deleteUserInvitation(receiver.userId, sender.userId );
        await deleteUserInvitation(sender.userId, receiver.userId );
        
        return res.sendStatus(204);
    }catch(e){
        console.error(e);
        next();
    }
};

exports.removeFriend = async (req, res, next) => {
    try{
        if( !req.params.userId ){
            throw new Error('Missing user id');
        }

        //Checking if the two users are friends
        let friendLink = await UserMongo.findOne({
            userId: req.params.userId, 
            "friendList.$.status": FRIEND_STATUS["ACCEPTED"]
        } );

        if(!friendLink){
            throw new Error('Invitation not found or you cannot accept an invitation for someone else');
        }

        let receiver = await getUser(req.user.id);
        let sender = await getUser(req.params.userId);

        const deleteUserFromFriendList = async (userId, friendId) => {
            await UserMongo.updateOne({userId},
                    { $pull: { friendList: { userId: friendId } } },
                    { multi: false }
                )
            .then(console.log);
        };

        await deleteUserFromFriendList(receiver.userId, sender.userId );
        await deleteUserFromFriendList(sender.userId, receiver.userId );
        
        return res.sendStatus(204);
    }catch(e){
        console.error(e);
        next();
    }
};

exports.getFriendshipStatus = async (req, res, next) => {
    try{
        if( !req.params.userId ){
            throw new Error('Missing friend id');
        }

        if( req.params.userId == req.user.id ){
            return res.status(200).json({message: "You cannot be friend with yourself"});
        }

        //let friendship = await UserMongo.findOne({userId: req.user.id, "friendList.userId": req.params.userId});
        let friendship = ( 
            await UserMongo.aggregate([
                {
                    $match: { userId: req.user.id }
                },
                {
                    $project: {
                        friendList: "$friendList"
                    }
                },
                {
                    $unwind : "$friendList"
                },
                {
                    $match: { "friendList.userId": req.params.userId }
                },
                {
                    $project: {
                        "friendList._id": 0
                    }
                }
            ])
        ).map( obj => obj.friendList);

        if( friendship.length === 0 ){
            return res.status(200).json({message: "NOT_FRIENDS"});
        }
        return res.status(200).json({message: friendship[0].status});
    }catch(e){
        console.error(e);
        next();
    }
};

const getUserFromCommonFriend = async (mongoUser) => {
    let users = []
    if(mongoUser.friendList.length === 0){
        return users;
    }
    let friendsFriendlist = [];
    let friendsId = [];

    for(let friend of mongoUser.friendList){
        let friendDocument = await UserMongo.findOne({userId: friend.userId});
        friendsId.push(friendDocument.userId);
        friendsFriendlist.push(friendDocument);
    }
    if(!friendsFriendlist || friendsFriendlist.length === 0){
        return users;
    }

    friendsFriendlist.map((friend) => {
        friend.friendList.map((friend) => {
            if(!friendsId.includes(friend.userId) && friend.userId != mongoUser.userId){
                if(users[friend.userId]){
                    users[friend.userId].commonFriends++;
                }else{
                    users[friend.userId] = {
                        user: {
                            id: friend.userId,
                            firstName: friend.firstName,
                            lastName: friend.lastName,
                        },
                        commonFriends: (users[friend.userId]?.occurences || 0) + 1
                    };
                }
            }
        })
    })
    return Object.values(users).sort((a, b) =>  b.commonFriends - a.commonFriends).slice(0,6);
}

const getUsersFromCommomTechnos  = async (user, friends) => {
    if(!user.technos || user.technos.length === 0){
        return [];
    }
    let usersMatching = {};
    const userTechnos = user.technos.map(techno => techno.id);
    let users = await User.findAll({
        where: {
            id: {
                [Op.ne]: user.id,
                [Op.notIn]: friends
            }
        },
        include: [
            {model: Techno, attributes: [ "id", "name"]}
        ]
    });
    if(users.length > 0){
        users.map(async (userMatching) => {
            if(!usersMatching[userMatching.id]){
                let userMatchingTechnos = userMatching.technos.map(techno => techno.id);
                usersMatching[userMatching.id] = {
                    user: { 
                        id: userMatching.id,
                        firstName: userMatching.firstName,
                        lastName: userMatching.lastName,
                    },
                    commonTechnos: userMatchingTechnos.filter(techno => userTechnos.includes(techno)).length
                };
            }
        })
    }
    return Object.values(usersMatching).sort((a, b) =>  b.commonTechnos - a.commonTechnos).slice(0,6);
}

const getUserWithSameField = async (user, friends) => {
    if(!user.fieldId){
        return [];
    }
    const fieldMatch = await User.findAll({ 
        where: {
            fieldId: user.fieldId,
            id: {
                [Op.ne]: user.id,
                [Op.notIn]: friends
            }
        },
        attributes: ['id', 'firstName', 'lastName'],
        order: connection.random(),
        limit: 5,
    });
    return fieldMatch;
}

exports.getFriendListRecommendation = async (req, res, next) => {
    try{
        const mongoUser = await getUser(req.user.id);
        const pgUser = await User.findOne({where:{id: req.user.id}, include: [{model: Techno, attributes: [ "id", "name"]}]});
        const friendListPgIds = (await UserMongo.aggregate([
            {
                $match: { userId: req.user.id }
            },
            {
                $unwind : "$friendList"
            },
            {
                $project: {
                    "_id": 0,
                    "friendList.userId": 1
                }
            }
        ])).map( obj => obj.friendList.userId);

        const usersWithOccurences = await getUserFromCommonFriend(mongoUser);
        const usersWithSameTechnos = await getUsersFromCommomTechnos(pgUser, friendListPgIds);
        const userWithSameField = await getUserWithSameField(pgUser, friendListPgIds);
        
        return res.status(200).json({usersWithOccurences, usersWithSameTechnos, userWithSameField});
    }catch(e){
        console.error(e);
        next();
    }
};
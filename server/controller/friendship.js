const mongoose = require('mongoose');

const { User: UserMongo } = require("../models/mongo");
const {FRIEND_STATUS, NOTIFICATION_TYPES} = require('../constants/enums');
const { createNotification } = require('../controller/notification');

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

        createNotification(NOTIFICATION_TYPES.FRIENDSHIP,{type: 'new', data: { 
            type: "friendship",
            emitter: receiver.firstName + " " + receiver.lastName
        }}, receiver.userId)

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
            console.log(`Looking for ${userId} document and set status=${status} in friendList where friendList.userId == ${friendId}`)
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
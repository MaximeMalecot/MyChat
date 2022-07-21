const mongoose = require('mongoose');

const { User: UserMongo } = require("../models/mongo");
const {FRIEND_STATUS} = require('../constants/enums');

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

        let senderSchema = friendListObject({userId: receiver.id, status: FRIEND_STATUS["AWAITING"], ...receiver});
        let receiverSchema = friendListObject({userId: sender.id, ...sender});

        await saveFriend(sender.userId, senderSchema)
        await saveFriend(receiver.userId, receiverSchema);

        res.sendStatus(201);
    }catch(e){
        console.error(e);
        next();
    }
};

exports.getList = async (req, res, next) => {
    try{
        if( !req.params.id ){
            throw new Error('Missing user id');
        }

        const user = await UserMongo.findOne({ userId: req.params.id }, { friendList: 1, _id: 0});
        res.status(200).json(user);
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

        return res.sendStatus(200);
    }catch(e){
        console.error(e);
        next();
    }
};

exports.denyInvitation = (req, res, next) => {

};
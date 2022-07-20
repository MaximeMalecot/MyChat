const { User: UserPG } = require("../models/postgres");
const { User: UserMongo } = require("../models/mongo");
const { FriendShip } = require("../models/postgres");

exports.sendInvitation = async (req, res, next) => {
    try{
        console.log(FriendShip);
        await FriendShip.create({
            sender: req.user.id,
            receiver: req.params.id
        });
        res.sendStatus(201);
    }catch(e){
        console.error(e);
        next();
    }
};

exports.getList = async (req, res, next) => {
    try{
        console.log(req.params.id);
        console.log('#################');
		const friendList = await UserMongo.find({ _id: req.query.id });
        res.status(200).json(friendList);
    }catch(e){
        next();
    }
};

exports.getInvitations = (req, res, next) => {

};

exports.acceptInvitation = (req, res, next) => {

};

exports.denyInvitation = (req, res, next) => {

};
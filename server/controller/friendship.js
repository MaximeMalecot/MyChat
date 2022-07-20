const { User } = require("../models/postgres");
const { FriendShip } = require("../models/postgres/FriendShip");

exports.sendInvitation = async (req, res, next) => {
    try{
        await FriendShip.create({
            sender: req.user.id,
            receiver: req.body.user
        });
        res.status(201);
    }catch(e){
        next();
    }
};

exports.getList = async (req, res, next) => {
    try{

    }catch(e){
        
    }
};

exports.getInvitations = (req, res, next) => {

};

exports.acceptInvitation = (req, res, next) => {

};

exports.denyInvitation = (req, res, next) => {

};
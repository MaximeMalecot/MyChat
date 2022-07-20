const mongoose = require('mongoose');

const { User: UserPG } = require("../models/postgres");
const { User: UserMongo } = require("../models/mongo");
const { FriendShip } = require("../models/postgres");

const {FRIEND_STATUS} = require('../constants/enums');

exports.sendInvitation = async (req, res, next) => {
    try{
        if( !req.params.id ){
            throw new Error('Missing sender id');
        }

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
        console.log(typeof req.params.id)
        if( !req.params.id){
            throw new Error('Missing user id');
        }

        const user = await UserMongo.findOne({ userId: req.params.id }, { friendList: 1, _id: 0});
        res.status(200).json(user);
    }catch(e){
        console.error(e);
        next();
    }
};

exports.getInvitations = (req, res, next) => {

};

exports.acceptInvitation = async (req, res, next) => {
    try{
        if( !req.params.id ){
            throw new Error('Missing user id');
        }

        await FriendShip.update({status: FRIEND_STATUS[1]},{
            where: {
                id: req.params.id
            }
        });

        return res.sendStatus(200);
    }catch(e){
        console.error(e);
        next();
    }
};

exports.denyInvitation = (req, res, next) => {

};
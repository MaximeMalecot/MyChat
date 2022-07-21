const mongoose = require('./db');
const {FRIEND_STATUS} = require('../../constants/enums');

const FriendListUser = new mongoose.Schema({
    userId: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    status: {
        type: String,
        enum: FRIEND_STATUS,
        default: FRIEND_STATUS["CREATED"]
    }
})

module.exports = FriendListUser;
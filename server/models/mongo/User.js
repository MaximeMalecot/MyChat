const mongoose = require('./db');
const {FRIEND_STATUS} = require('../../constants/enums');

const FriendListUser = new mongoose.Schema({
    userId: {type: String, required: true},
    userName: {type: String, required: true},
    status: {
        type: String,
        enum: FRIEND_STATUS,
        default: FRIEND_STATUS[0]
    }
})

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    friendlist: FriendListUser,
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
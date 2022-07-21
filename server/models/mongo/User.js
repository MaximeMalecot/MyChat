const mongoose = require('./db');
const {FRIEND_STATUS} = require('../../constants/enums');

const FriendListUser = new mongoose.Schema({
    userId: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    status: {
        type: String,
        enum: FRIEND_STATUS,
        default: FRIEND_STATUS[0]
    }
})

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    friendList: { type: Array },
    userId: { type: Number, required: true}
});

const User = mongoose.model("users", UserSchema);

module.exports = User;

/*
{
    _id:,
    firstName:,
    lastName:,
    friendList: {
        {
            userId: id,
            ...
        },
        ...,
        {
            userId: id
        }
    }
}
 */
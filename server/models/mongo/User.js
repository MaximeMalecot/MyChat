const mongoose = require('./db');
const FriendListUser = require('./FriendListUser');

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    friendList: { type: [FriendListUser] },
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
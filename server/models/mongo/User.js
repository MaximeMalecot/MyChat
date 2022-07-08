const mongoose = require('./db');

const FriendListUser = new mongoose.Schema({
    userId: {type: String, required: true},
    userName: {type: String, required: true}
})

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    friendlist: FriendListUser,
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
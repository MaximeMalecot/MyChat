const mongoose = require('./db');
const User  = require('./User').schema;

const MessageSchema = new mongoose.Schema({
    content: {type: String, required: true},
    //sender: User,
    //receiver: User
});

const Message = mongoose.model("messages", MessageSchema);

module.exports = Message;
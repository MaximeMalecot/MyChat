const mongoose = require('./db');

const MessageSchema = new mongoose.Schema({
    content: {type: String, required: true},
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    createdAt: {type: Date, default: Date.now},
});

const Message = mongoose.model("messages", MessageSchema);

module.exports = Message;
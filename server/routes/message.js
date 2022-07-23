const { Router } = require("express");
const { MessageController } = require("../controller");
const { verifyToken } = require("../middlewares/auth");

const router = new Router();

router.get('/', verifyToken, MessageController.getConversations);

router.route('/:userId')
    .post(verifyToken, MessageController.sendMessage)
    .get(verifyToken, MessageController.getMessages);

module.exports = router;
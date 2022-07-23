const { Router } = require("express");
const { MessageController } = require("../controller");
const { verifyToken } = require("../middlewares/auth");

const router = new Router();

router.get('/', verifyToken, MessageController.getConversations);

router.post('/:userId', verifyToken, MessageController.send);

module.exports = router;
const { Router } = require("express");
const { MessageController } = require("../controller");
const { verifyToken } = require("../middlewares/auth");

const router = new Router();

router.get('/', verifyToken, MessageController.getConversations);

module.exports = router;
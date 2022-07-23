const { Router } = require("express");
const { NotificationController } = require("../controller");
const { verifyToken } = require('../middlewares/auth');

const router = new Router();

router.get('/', verifyToken, NotificationController.getNotifications);

module.exports = router;
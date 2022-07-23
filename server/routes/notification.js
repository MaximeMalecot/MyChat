const { Router } = require("express");
const { NotificationController } = require("../controller");
const { verifyToken } = require('../middlewares/auth');

const router = new Router();

router.route('/')
    .get(verifyToken, NotificationController.getNotifications)
    .patch(verifyToken, NotificationController.readNotifications)

module.exports = router;
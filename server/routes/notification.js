const { Router } = require("express");
const { NotificationController } = require("../controller");

const router = new Router();

router.get('/', NotificationController.getSSE);

module.exports = router;
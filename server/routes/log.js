const { Router } = require("express");
const { LogController } = require('../controller');

const router = new Router();
router.route('/')
    .post(LogController.postLog)
    .get(LogController.getLogs)

module.exports = router;
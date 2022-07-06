const { Router } = require("express");
const { logController } = require('../controller');


const router = new Router();

router.post('/logs', logController.postLog);

router.get('/logs', logController.getLogs);

module.exports = router;
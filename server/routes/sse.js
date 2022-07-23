const { Router } = require("express");
const { SSEController } = require("../controller");

const router = new Router();

router.get('/', SSEController.getSSE);

module.exports = router;
const { Router } = require("express");
const { SecurityController } = require('../controller');

const router = new Router();

router.post("/login", SecurityController.login);

router.post("/register", SecurityController.register);

module.exports = router;

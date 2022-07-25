const { Router } = require("express");
const { SecurityController } = require('../controller');
const { verifyToken, blacklistToken } = require('../middlewares/auth');

const router = new Router();

router.post("/login", SecurityController.login);

router.post("/register", SecurityController.register);

router.post('/logout', verifyToken, blacklistToken);

module.exports = router;

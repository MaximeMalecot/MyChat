const { Router } = require("express");
const { TechnoController } = require('../controller');
const {verifyToken, checkAdmin} = require('../middlewares/auth');
const router = new Router();

router.route('/')
    .post(verifyToken, checkAdmin, TechnoController.postTechno)
    .get( verifyToken, checkAdmin, TechnoController.getTechnos)

module.exports = router;
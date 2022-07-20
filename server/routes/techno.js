const { Router } = require("express");
const { TechnoController } = require('../controller');
const {verifyToken, checkAdmin} = require('../middlewares/auth');
const router = new Router();

router.route('/')
    .post(async(req, res, next) => { next() }
    )
    .get( verifyToken, checkAdmin, TechnoController.getTechnos)

module.exports = router;